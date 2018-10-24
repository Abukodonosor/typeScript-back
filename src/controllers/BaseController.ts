import { NextFunction, Request, Response } from "express";

/**
 * Constructor
 *
 * @class BaseRoute
 */
export class BaseController {

  protected title: string;

  private scripts: string[];

  /**
   * Constructor
   */
  constructor() {
    //initialize variables
    this.title = "freak_out";
    this.scripts = [];
  }

  /**
   * Add a JS external file to the request.
   */
  public addScript(src: string): BaseController {
    this.scripts.push(src);
    return this;
  }

  /**
   * Render a page.
   */
  public render(req: Request, res: Response, view: string, options?: Object) {
    //add constants
    res.locals.BASE_URL = "/";

    //add scripts
    res.locals.scripts = this.scripts;

    //add title
    res.locals.title = this.title;

    //render view
    res.render(view, options);
  }
}