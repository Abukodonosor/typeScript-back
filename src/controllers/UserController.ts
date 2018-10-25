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
    console.log(`[UserController::create] Creating UserController route:`);

    //index page 
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new UserController().index(req, res, next);
    });
    /* LogIn and LogOut logic */
    router.post('/home', (req: Request, res: Response, next: NextFunction) => {
      new UserController().logIn(req, res, next);
    });

    router.get("/LogOut", (req: Request, res: Response, next: NextFunction) => {
      new UserController().logOut(req, res, next);
    });

    /* Register view and logic */
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

    //set options
    let options: Object = {
      "message": "Lets freak out",
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
  
    //if email or password are not provided => here we could make one more class who will take care about validation of our fields
    if(email == '' || password == ''){
      //set options
      let options: Object = {
      "message": "Pls fill all fields",
      };
      //render template
      this.render(req, res, "index", options);
    }
    //check if user with this parametars exist
    var user = await User.exist(email,password);

    if(user == false){
      //set options
      let options: Object = {
        "message": "Incoret user or password!",
      };
      //render template
      this.render(req, res, "index", options);
    }else{
      //list all contracts and send with user.js
      let contracts = await Contract.takeAll(user);
      req.session.userId = user['id'];
      //set options
      let options: Object = {
        "user": user,
        "contracts": contracts
      };
      //render template
      this.render(req,res, "home", options);
    }

  }

  //get routre for register
  public async register(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Register user view page";

    //set options
    let options: Object = {
      "message": "",
    };
    //render template
    this.render(req, res, "register", options);
  }

  public async registerAuth(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Register user view page";
    
    let email = req.body.email;
    let password = req.body.password;
    let user;

    //if email or password are not provided
    if(email == '' || password == ''){
      //set options
      let options: Object = {
      "message": "Pls fill all input fields",
      };
      //render template
      this.render(req, res, "register", options);
    }

    //if user with that email addres exist
    let user_status = await User.existEmail(email);
    if(user_status == false){
      user = await new User(email,password);
      await user.save();
      //set options
      let options: Object = {
        "message": "Enter your credentials",
      };
      //render template
      this.render(req, res, "index", options);
    }else{
      //set options
      let options: Object = {
        "message": "email is allready taken",
      };
      //render template
      this.render(req, res, "register", options);
    }
  }

  //logOut route
  public async logOut(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "LogOut page logic (delete cookie)";
    delete req.session.userId;
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  }


}
