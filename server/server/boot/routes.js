'use strict';
module.exports = function (server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    router.get('/', server.loopback.status());
    var User = server.models.CustomUser;
    server.post('/login', function (req, res) {
        User.login({
            email: req.body.email,
            password: req.body.password
        }, 'user', function (err, token) {
            if (err) {
                res.send({
                    title: 'Login failed',
                    content: err,
                    redirectTo: '/',
                    redirectToLinkText: 'Try again'
                });
                return;
            }
            res.send({
                email: req.body.email,
                accessToken: token.id
            });
        });
    });
    server.use(router);
};
//# sourceMappingURL=routes.js.map