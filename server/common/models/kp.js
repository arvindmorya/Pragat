'use strict';
module.exports = function (Kp) {
    Kp.beforeRemote('create', function (ctx, instance, next) {
        delete Kp.validations.username;
        //override username and role
        ctx.args.data.username = ctx.args.data.username || ctx.args.data.phone_number;
        ctx.args.data.role = "kp";
        // Validations
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        Kp.validatesUniquenessOf('phone_number', { message: 'Phone Number Already Exists' });
        Kp.validatesUniquenessOf('udise_id', { message: 'UdiseId Already Exists' });
        Kp.validatesLengthOf('password', { min: 8, message: { min: 'Password is too short' } });
        Kp.validatesLengthOf('phone_number', { is: 10, message: { min: 'Phone Number' } });
        Kp.validatesFormatOf('email', { with: re, message: 'Email Invalid' });
        Kp.validatesPresenceOf('cluster_udise_id', { message: 'Cluster Details Missing' });
        next();
    });
};
//# sourceMappingURL=kp.js.map