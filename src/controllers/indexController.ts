import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./BaseController";

import {User} from "../models/UserModel";

/**
 * Controller fo
 */
export class IndexController extends BaseController {

  public static create(router: Router) {
    //log
    console.log(`[IndexController::create] Creating IndexController route:`);

    //add page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexController().index(req, res, next);
    });

    router.post("/logIn", (req: Request, res: Response, next: NextFunction) => {
      new IndexController().logIn(req, res, next);
    });

    router.get("/LogOut", (req: Request, res: Response, next: NextFunction) => {
      new IndexController().logOut(req, res, next);
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
    this.title = "This is title of my action";

    var noviCovek = new User("djoka@gmail.com","djoka123","djoka123");

    var answer = await noviCovek.save();
    console.log("ANSWER IS :"+answer);

    //set options
    let options: Object = {
      "message": "Lets freak out",
      "covek": JSON.stringify(noviCovek)
    };
    //render template
    this.render(req, res, "index", options);
  }

  public async logIn(req: Request, res: Response, next: NextFunction) {

    let email = req.body.email;
    let password = req.body.password;

    let user = await User.exist(email,password);
    //list all contracts and send with user.js


    //set options
    let options: Object = {
      "user": user,
    };
    //render template
    this.render(req,res, "home", options);

  }

  public async logOut(req: Request, res: Response, next: NextFunction) {

    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid');
      res.redirect('/');
    } else {
      res.redirect('/');
    }

  }



}
