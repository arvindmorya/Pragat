'use strict';

export = function(District: any) {
    
    District.beforeRemote('create', function(ctx: any, instance: any, next: any) {
        //Validations
        District.validatesUniquenessOf('udise_id', {message: 'UdiseId already exists'});
        
        next();
    });
};
