'use strict';
module.exports = function (School) {
    School.beforeRemote('create', function (ctx, instance, next) {
        //Validations
        School.validatesUniquenessOf('udise_id', { message: 'UdiseId already exists' });
        next();
    });
    School.observe('loaded', function logQuery(ctx, next) {
        School.app.models.cluster.find({ where: { udise_id: ctx.data.cluster_udise_id } }, function (err, clusters) {
            if (err)
                return console.log('Cluster with udise_id ' + ctx.data.udise_id + ' not found!', err);
            if (clusters && clusters.length) {
                var cluster = clusters[0].__data;
                ctx.data.cluster = {
                    "name": cluster.name,
                    "udise_id": cluster.udise_id,
                    "kp": cluster.kp
                };
            }
            next();
        });
    });
};
//# sourceMappingURL=school.js.map