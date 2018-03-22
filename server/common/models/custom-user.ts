'use strict';

export  = function (Customuser) {

    Customuser.beforeRemote('create', function(ctx, instance, next) {
        console.log('before create');
        //override username
        ctx.args.data.username = ctx.args.data.phone_number;
        next();
    });
};
// export default Customuser;
// export = CustomUser
