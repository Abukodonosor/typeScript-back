"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cookieParser = require("cookie-parser");
var express = require("express");
var path = require("path");
var errorHandler = require("errorhandler");
var logger = require("morgan");
var DB_1 = require("./models/DB");
var ExpressSession = require("express-session");
/* import Middlewares*/
var loginMiddleware_1 = require("./middlewares/loginMiddleware");
/* import Controllers*/
var UserController_1 = require("./controllers/UserController");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        /* config for our server */
        this.config();
        /* add route */
        this.routes();
        /* rest API routs*/
        this.api();
    }
    Server.singl = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.set('view engine', 'ejs');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser("SOME-SECRET-WORD"));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'views')));
        //init db connection
        DB_1.DB.init();
        this.app.use(ExpressSession({ name: 'user_sid', secret: 'somerandonstuffs', resave: false, saveUninitialized: true, }));
        //active middlwares
        this.app.use(loginMiddleware_1.AuthenticationMiddleware.cookieSafe);
        this.app.use(loginMiddleware_1.AuthenticationMiddleware.loginCheck);
        // this.app.use(myMiddleware);
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    /* declare routes with views*/
    Server.prototype.routes = function () {
        var router;
        router = express.Router();
        /* All Controllers goes here */
        UserController_1.UserController.create(router);
        this.app.use(router);
    };
    /* declare api endpoints*/
    Server.prototype.api = function () {
    };
    return Server;
}());
exports.Server = Server;
