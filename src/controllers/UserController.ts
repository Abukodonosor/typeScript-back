import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./BaseController";

import {User} from "../models/UserModel";
import {Contract} from "../models/ContractModel";

/**
 * Controller Index
 */
export class UserController extends BaseController {

  public static create(router: Router) {
    //log
    console.log(`[IndexController::create] Creating IndexController route:`);

    //add page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new UserController().index(req, res, next);
    });

    router.post('/home', (req: Request, res: Response, next: NextFunction) => {
      new UserController().logIn(req, res, next);
    });

    router.get("/LogOut", (req: Request, res: Response, next: NextFunction) => {
      new UserController().logOut(req, res, next);
    });

    router.get('/register', (req: Request, res: Response, next: NextFunction) => {
      new UserController().register(req,res,next);
    });

    router.post('/register', (req: Request, res: Response, next: NextFunction) => {
      new UserController().registerAuth(req,res,next);
    });

    // add more routes

  }

  /**
   * Constructor
   */ 
  constructor() {
    super();
  }

  public async index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Show login page";

    var noviCovek = new User("djoka@gmail.com","djoka123","djoka123");

    var answer = await noviCovek.save();
    console.log("ANSWER IS :"+answer);

    //set options
    let options: Object = {
      "message": "Lets freak out",
      // "covek": JSON.stringify(noviCovek)
    };
    //render template
    this.render(req, res, "index", options);
  }

  //login route, check if user exist => true [fatch all contracts and pass them to the view]: else [ render log page with error message]
  public async logIn(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Auth Login and send user to home page";

    let email = req.body.email;
    let password = req.body.password;

    //check if user with this parametars exist
    var user = await User.exist(email,password);

    //list all contracts and send with user.js
    let contracts = await Contract.takeAll(user);

    //set options
    let options: Object = {
      "user": user,
      "contracts": contracts
    };
    //render template
    this.render(req,res, "home", options);

  }

  //get routre for register
  public async register(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Register user view page";

    //set options
    let options: Object = {
      "message": "Lets freak out",
    };
    //render template
    this.render(req, res, "register", options);

  }

  public async registerAuth(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Register user view page";
    
    let email = req.body.email;
    let password = req.body.password;
    
    //ako ne postoji napravi, ako postoji vrati gresku da izabere opet

    //set options
    let options: Object = {
      "message": "Enter your credentials",
    };
    //render template
    this.render(req, res, "index", options);
  }

  //logOut route
  public async logOut(req: Request, res: Response, next: NextFunction) {

    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
    } else {
      res.redirect('/');
    }

  }



}
