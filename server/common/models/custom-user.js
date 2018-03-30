'use strict';
module.exports = function (Customuser) {
    Customuser.setup = function () {
        Customuser.base.setup.apply(this, arguments);
        this.beforeRemote('create', function (ctx, instance, next) {
            delete Customuser.validations.username;
            var cluster_udise_id;
            ctx.args.data.username = ctx.args.data.username || ctx.args.data.phone_number;
            Customuser.app.models.School.find({ where: { udise_id: ctx.args.data.school_udise_id } }, function (err, schools) {
                if (err)
                    return console.log('School with udise_id ' + ctx.args.data.school_udise_id + ' not found!', err);
                if (schools && schools.length) {
                    var school = schools[0];
                    ctx.args.data.schoolId = school.id,
                        ctx.args.data.school_udise_id = school.udise_id;
                    cluster_udise_id = school.cluster_udise_id;
                }
                cluster_udise_id = cluster_udise_id || ctx.args.data.cluster_udise_id;
                Customuser.app.models.Cluster.find({ where: { udise_id: cluster_udise_id } }, function (err, clusters) {
                    if (err)
                        return console.log('Cluster with udise_id ' + ctx.args.data.cluster_udise_id + ' not found!', err);
                    if (clusters && clusters.length) {
                        var cluster = clusters[0];
                        ctx.args.data.clusterId = cluster.id;
                        ctx.args.data.cluster_udise_id = cluster.udise_id;
                    }
                    Customuser.app.models.Kp.find({ where: { cluster_udise_id: cluster_udise_id } }, function (err, kps) {
                        if (err)
                            return console.log('KP with udise_id ' + ctx.args.data.kp_udise_id + ' not found!', err);
                        if (kps && kps.length) {
                            var kp = kps[0];
                            ctx.args.data.kpId = kp.id;
                            ctx.args.data.kp_udise_id = kp.udise_id;
                        }
                        if (ctx.args.data.role == "teacher") {
                            Customuser.validatesPresenceOf('kp_udise_id', { message: 'Kp Udise Id Missing' });
                        }
                        next();
                    });
                });
            });
        });
    };
    Customuser.setup();
    Customuser.on('resetPasswordRequest', function (info) {
        var html = "Please use " + info.accessToken.$password_reset_otp + " as one time token to reset your password in the app.";
        Customuser.app.models.Email.send({
            to: info.email,
            from: info.email,
            subject: 'Password Reset Instructions',
            html: html
        }, function (err) {
            if (err)
                return console.log('> error sending password reset email', err);
            console.log('> sending password reset email to:', info.email);
        });
    });
};
//# sourceMappingURL=custom-user.js.map