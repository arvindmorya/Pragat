'use strict';

export = function(Kp) {

    Kp.beforeRemote('create', function(ctx, instance, next) {
        console.log('before create');
        //override username and role
        ctx.args.data.username = ctx.args.data.phone_number;
        ctx.args.data.role = "kp";
        next();
    });

};
