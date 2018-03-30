import { exists } from "fs";

'use strict';
// import {User} from '../../node_modules/loopback/common/models/user'
// var Customuser = require("../../common/models/custom-user")
export = function(server : any) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  var User = server.models.CustomUser;
  var AccessToken = server.models.CustomAccesstoken;
  server.post('/login', function(req: any, res: any) {
    var loginObj = {};
    if(req.body.email){
      loginObj = {
        email: req.body.email,
        password: req.body.password
      }
    }
    else if(req.body.phone_number){
      loginObj = {
        username: req.body.phone_number,
        password: req.body.password
      }
    }
    User.login(loginObj, 'user', function(err: any, token: any) {
      if (err) {
        var error = {
          "error": {
            "statusCode" : err.statusCode,
            "message" : "Invalid Credentials"
          }
        }
        res.status(401).send(error);

        return;
      }
      var user = token.__data.user.__data;
      res.send({
        email: req.body.email,
        phone_number: req.body.phone_number,
        accessToken: token.id,
        name: user.name,
        udise_id: user.udise_id,
        role: user.role
      });
    });
  });


  server.post('/request-password-reset', function(req: any, res: any) {
    var exists : any = false;
    User.find( {"where": {"email": req.body.email} }, function (err:Error, users:any) {
      if (err)
          return res.sendStatus(404);
      if(users && users.length){
        var user = users[0];
        AccessToken.find({"where": {"userId": user.id} }, function (err:Error, accessTokens:any) {
          if (err)
              return res.sendStatus(404);
          if(accessTokens && accessTokens.length){
            var accessToken: any
            for(var i = 0; i < accessTokens.length; i++) {
                if (accessTokens[i].password_reset_otp) {
                    accessToken = accessTokens[i];
                    exists = true;
                    break;
                }
            }
            if(exists){
              User.emit('resetPasswordRequest', {
                email: user.email,
                accessToken: accessToken,
                user: user
              });
              res.send({
                title: 'Password reset requested',
                content: 'Check your email for further instructions',
              });
            }
          }
          else if(!exists){
            User.resetPassword({
              email: req.body.email
            }, function(err: Error) {
              if (err) return res.status(401).send(err);
              res.send({
                title: 'Password reset requested',
                content: 'Check your email for further instructions',
              });
            });
          }
          else{
            var error = {
              "error" : {
                "statusCode" : 404,
                "message" : "Invalid Request"
              }
            }
            return res.status(404).send(error)
          }
        });
      }
      else{
        var error = {
          "error": {
            "statusCode" : 404,
            "message" : "User not registered"
          }
        }
        return res.status(404).send(error)
      }
    });
  });

  server.post('/resetPassword', function(req: any, res: any) {
    if(req.body.token){
      AccessToken.find( {"where": {"password_reset_otp": req.body.token} }, function (err:Error, accessTokens:any) {
          if (err)
              return res.sendStatus(404);
          if(accessTokens.length > 1)
            return res.sendStatus(400);
          var accessToken = accessTokens[0];
          if (accessToken && accessToken.userId) {
              User.findById(accessToken.userId, function (err: Error, user: any) {
                  if (err)
                      return res.sendStatus(404);
                  user.updateAttribute('password', req.body.password, function (err: Error) {
                      if (err)
                          return res.sendStatus(404);
                      console.log('> password reset processed successfully');
                      res.send({
                          title: 'Password reset success',
                          content: 'Your password has been reset successfully',
                      });
                  });
              });
          }
          else{
            var error = {
                "error" : {
                  "statusCode" : 404,
                  "message" : "Invalid OTP"
                }
              }
            return res.status(404).send(error)
          }
      });
    }
    else{
      return res.sendStatus(400);
    }
  });

  
  
  server.use(router);

};
