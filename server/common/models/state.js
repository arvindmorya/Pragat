'use strict';
module.exports = function (State) {
    State.beforeRemote('create', function (ctx, instance, next) {
        //Validations
        State.validatesUniquenessOf('udise_id', { message: 'UdiseId already exists' });
        next();
    });
};
//# sourceMappingURL=state.js.map