'use strict';
module.exports = function (Teacher) {
    Teacher.beforeRemote('create', function (ctx, instance, next) {
        console.log('before create');
        //override username and role
        ctx.args.data.username = ctx.args.data.phone_number;
        ctx.args.data.role = "teacher";
        next();
    });
};
//# sourceMappingURL=teacher.js.map