'use strict';

export = function(Block: any) {
    Block.beforeRemote('create', function(ctx: any, instance: any, next: any) {
        //Validations
        Block.validatesUniquenessOf('udise_id', {message: 'UdiseId already exists'});
        
        next();
    });
};
