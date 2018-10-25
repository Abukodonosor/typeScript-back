import {Request,Response,NextFunction} from 'express';


export class  AuthenticationMiddleware{

    public static loginCheck(req:Request, res:Response, next:NextFunction){
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/');
        }else {
            next();
        }    
    }

    public static isAuth(req:Request, res:Response, next:NextFunction){
        if (!req.session.userId) {
            res.redirect('/');
        }else {
            next();
        }    
    }

    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    public static cookieSafe(req:Request, res:Response, next:NextFunction){
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid');       
        }
        next();
    }
    

}