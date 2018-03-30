'use strict';

export = function(State: any) {
    State.beforeRemote('create', function(ctx: any, instance: any, next: any) {
        //Validations
        State.validatesUniquenessOf('udise_id', {message: 'UdiseId already exists'});
        
        next();
    });
};
