'use strict';
module.exports = function (Cluster) {
    Cluster.beforeRemote('create', function (ctx, instance, next) {
        //Validations
        Cluster.validatesUniquenessOf('udise_id', { message: 'UdiseId already exists' });
        next();
    });
    Cluster.observe('loaded', function (ctx, next) {
        Cluster.app.models.Kp.find({ where: { cluster_udise_id: ctx.data.udise_id } }, function (err, kps) {
            if (err)
                return console.log('Kp with udise_id ' + ctx.data.udise_id + ' not found!', err);
            if (kps && kps.length) {
                var kp = kps[0].__data;
                ctx.data.kp = {
                    "name": kp.name,
                    "udise_id": kp.udise_id
                };
            }
            next();
        });
    });
};
//# sourceMappingURL=cluster.js.map