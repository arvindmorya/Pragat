'use strict';
module.exports = function (Teacher) {
    Teacher.beforeRemote('create', function (ctx, instance, next) {
        delete Teacher.validations.username;
        //override username and role
        ctx.args.data.username = ctx.args.data.username || ctx.args.data.phone_number;
        ctx.args.data.role = "teacher";
        //Validations
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        Teacher.validatesUniquenessOf('phone_number', { message: 'Phone Number Already Exists' });
        Teacher.validatesUniquenessOf('udise_id', { message: 'UdiseId Already Exists' });
        Teacher.validatesLengthOf('password', { min: 8, message: { min: 'Password is too short' } });
        Teacher.validatesLengthOf('phone_number', { is: 10, message: { min: 'Phone Number' } });
        Teacher.validatesFormatOf('email', { with: re, message: 'Email Invalid' });
        Teacher.validatesPresenceOf('school_udise_id', { message: 'School Udise Id Missing' });
        Teacher.validatesPresenceOf('kp_udise_id', { message: 'Kp Udise Id Missing' });
        next();
    });
};
//# sourceMappingURL=teacher.js.map