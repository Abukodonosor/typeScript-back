import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./BaseController";

import {User} from "../models/UserModel";
import {Contract} from "../models/ContractModel";

import {AuthenticationMiddleware} from '../middlewares/loginMiddleware';
/**
 * Controller Index
 */
export class ContractController extends BaseController {

  public static create(router: Router) {
    //log
    console.log(`[ContractController::create] Creating ContractController route:`);

    //contract view and logic
    router.get("/addContract",AuthenticationMiddleware.isAuth, (req: Request, res: Response, next: NextFunction) => {
      new ContractController().contractView(req, res, next);
    });

    router.post("/addContract",AuthenticationMiddleware.isAuth, (req: Request, res: Response, next: NextFunction) => {
        new ContractController().contractLogic(req, res, next);
    });
    //edit contract and logic
    router.get("/editContract/:id",AuthenticationMiddleware.isAuth, (req: Request, res: Response, next: NextFunction) => {
        new ContractController().contractViewEdit(req, res, next);
    });

    router.post("/editContract",AuthenticationMiddleware.isAuth, (req: Request, res: Response, next: NextFunction) => {
        new ContractController().contractLogicEdit(req, res, next);
    });

    router.get("/deleteContract/:id",AuthenticationMiddleware.isAuth, (req: Request, res: Response, next: NextFunction) => {
        new ContractController().deleteContract(req, res, next);
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

  public async contractView(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Show new contract page";

    //set options
    let options: Object = {
      "message": "",
    };
    //render template
    this.render(req, res, "contract", options);
  }

  public async contractLogic(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Logic to save new contract";

    let title = req.body.title;
    let company = req.body.company;
    let year_price = req.body.year_price;

    let contract = new Contract(title,company,year_price,req.session.userId);

    await contract.save();

    let user = await User.findById(req.session.userId);

    let contracts = await Contract.takeAll(user);
    //set options
    let options: Object = {
      "user": user,
      "contracts": contracts
    };
    //render template
    this.render(req,res, "home", options);
  }

  public async contractViewEdit(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "EDIT contract page";

    let contract_id = req.params.id;
    let contract = await Contract.findById(contract_id);
    //set options
    let options: Object = {
      "contract": contract,
    };
    //render template
    this.render(req, res, "contractEdit", options);
  }

  public async contractLogicEdit(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "EDIT LOGIC contract page";

    let title = req.body.title;
    let company = req.body.company;
    let year_price = req.body.year_price;
    let id = req.body.id;

    let contract = new Contract(title, company, year_price, req.session.userId, id);

    await contract.updateExisting();

    let user = await User.findById(req.session.userId);

    let contracts = await Contract.takeAll(user);
    //set options
    let options: Object = {
      "user": user,
      "contracts": contracts
    };
    //render template
    this.render(req,res, "home", options);
  }

  public async deleteContract(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Delete contract";

    let contract_id = req.params.id;
    let contract = await Contract.deleteById(contract_id);
    
    let user = await User.findById(req.session.userId);

    let contracts = await Contract.takeAll(user);
    //set options
    let options: Object = {
      "user": user,
      "contracts": contracts
    };
    //render template
    this.render(req,res, "home", options);
  }
  

}
