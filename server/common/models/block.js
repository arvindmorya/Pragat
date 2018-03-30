'use strict';
module.exports = function (Block) {
    Block.beforeRemote('create', function (ctx, instance, next) {
        //Validations
        Block.validatesUniquenessOf('udise_id', { message: 'UdiseId already exists' });
        next();
    });
};
//# sourceMappingURL=block.js.map