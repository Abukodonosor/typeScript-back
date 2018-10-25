import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import errorHandler = require('errorhandler');
import methodOverride = require("method-override");
import logger = require('morgan');
import {DB} from './models/DB'
import * as ExpressSession from 'express-session';
/* import Middlewares*/
import {AuthenticationMiddleware} from './middlewares/loginMiddleware';


/* import Controllers*/
import { UserController } from "./controllers/UserController";
import {ContractController} from "./controllers/ContractController";

export class Server {

    public app;

    public static singl(): Server {
      return new Server();
    }

    constructor(){
        this.app = express();

        /* config for our server */
        this.config();
        /* add route */
        this.routes();
        /* rest API routs*/
        this.api();
    }

    public config(){

        this.app.set('view engine', 'ejs');
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser("SOME-SECRET-WORD"));

        this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(express.static(path.join(__dirname, '../views')));
        //init db connection
        DB.init();
        //express session init
        this.app.use(ExpressSession({name:'user_sid', secret: 'somerandonstuffs', resave: false, saveUninitialized: true, }));
        //active middlwares
        this.app.use(AuthenticationMiddleware.cookieSafe);
        this.app.use(AuthenticationMiddleware.loginCheck);

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    }

    /* declare routes with views*/
    public routes(){
        let router: express.Router;
        router = express.Router();
        
        /* All Controllers goes here */
        UserController.create(router);
        ContractController.create(router);

        this.app.use(router);
    }

    /* declare api endpoints*/
    public api(){
        
    }


}