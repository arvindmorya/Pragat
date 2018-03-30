'use strict';
module.exports = function (District) {
    District.beforeRemote('create', function (ctx, instance, next) {
        //Validations
        District.validatesUniquenessOf('udise_id', { message: 'UdiseId already exists' });
        next();
    });
};
//# sourceMappingURL=district.js.map