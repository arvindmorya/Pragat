'use strict';

export = function(Cluster: any) {
    Cluster.beforeRemote('create', function(ctx: any, instance: any, next: any) {
        //Validations
        Cluster.validatesUniquenessOf('udise_id', {message: 'UdiseId already exists'});
        next();
    });

    Cluster.observe('loaded', function(ctx: any, next: any) {
        Cluster.app.models.Kp.find({where:{cluster_udise_id: ctx.data.udise_id}}, function(err: Error, kps:any){
            if (err) return console.log('Kp with udise_id ' + ctx.data.udise_id + ' not found!',err);
            if(kps && kps.length){
                var kp = kps[0].__data;
                ctx.data.kp = {
                    "name" : kp.name,
                    "udise_id" : kp.udise_id
                }
            }
            next();
        })
    });
};
