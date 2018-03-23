'use strict';
// import {User} from '../../node_modules/loopback/common/models/user'
// var Customuser = require("../../common/models/custom-user")
export = function(server : any) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  var User = server.models.CustomUser;
  server.post('/login', function(req: any, res: any) {
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err: any, token: any) {
      if (err) {
        res.send({ //render view named 'response.ejs'
          title: 'Login failed',
          content: err,
          redirectTo: '/',
          redirectToLinkText: 'Try again'
        });
        return;
      }
      res.send({ //login user and render 'home' view
        email: req.body.email,
        accessToken: token.id
      });
    });
  });
  
  server.use(router);

};
