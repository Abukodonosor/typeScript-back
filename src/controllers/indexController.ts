import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./BaseController";

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

    // add more routes

  }

  /**
   * Constructor
   */
  constructor() {
    super();
  }

  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "This is title of my action";
    //set options
    let options: Object = {
      "message": "Lets freak out"
    };
    //render template
    this.render(req, res, "index", options);
  }


}
