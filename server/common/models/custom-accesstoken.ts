'use strict';

export = function(Customaccesstoken:any) {
    Customaccesstoken.observe('before save', function updateTimestamp(ctx: any, next:any) {
        // console.log("*******",ctx)
        if (ctx.instance.$ttl == 1440) {
          ctx.instance.$password_reset_otp  = Math.floor(Math.random()*899999+100000);
        }
        next();
      });
    // Customaccesstoken.beforeRemote('create', function(ctx: any, instance: any, next: any) {
    //     console.log("*******",ctx)
    //     // //override username and role
    //     // ctx.args.data.username = ctx.args.data.username || ctx.args.data.phone_number;
    //     // ctx.args.data.role = "kp";

    //     // //Validations
    //     // Kp.validatesUniquenessOf('phone_number', {message: 'Phone Number already exists'});
    //     // Kp.validatesUniquenessOf('udise_id', {message: 'UdiseId already exists'});
        
    //     next();
    // });
};
