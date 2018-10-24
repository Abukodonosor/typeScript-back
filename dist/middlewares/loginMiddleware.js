"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthenticationMiddleware = /** @class */ (function () {
    function AuthenticationMiddleware() {
    }
    AuthenticationMiddleware.loginCheck = function (req, res, next) {
        console.log("OVO RADI!!!!!!!!");
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/');
        }
        else {
            next();
        }
    };
    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    AuthenticationMiddleware.cookieSafe = function (req, res, next) {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');
        }
        next();
    };
    return AuthenticationMiddleware;
}());
exports.AuthenticationMiddleware = AuthenticationMiddleware;
