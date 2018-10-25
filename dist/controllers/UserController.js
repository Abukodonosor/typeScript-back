"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController_1 = require("./BaseController");
var UserModel_1 = require("../models/UserModel");
var ContractModel_1 = require("../models/ContractModel");
/**
 * Controller Index
 */
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    /**
     * Constructor
     */
    function UserController() {
        return _super.call(this) || this;
    }
    UserController.create = function (router) {
        //log
        console.log("[UserController::create] Creating UserController route:");
        //index page 
        router.get("/", function (req, res, next) {
            new UserController().index(req, res, next);
        });
        /* LogIn and LogOut logic */
        router.post('/home', function (req, res, next) {
            new UserController().logIn(req, res, next);
        });
        router.get("/LogOut", function (req, res, next) {
            new UserController().logOut(req, res, next);
        });
        /* Register view and logic */
        router.get('/register', function (req, res, next) {
            new UserController().register(req, res, next);
        });
        router.post('/register', function (req, res, next) {
            new UserController().registerAuth(req, res, next);
        });
        // add more routes
    };
    UserController.prototype.index = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                //set custom title
                this.title = "Show login page";
                options = {
                    "message": "Lets freak out",
                };
                //render template
                this.render(req, res, "index", options);
                return [2 /*return*/];
            });
        });
    };
    //login route, check if user exist => true [fatch all contracts and pass them to the view]: else [ render log page with error message]
    UserController.prototype.logIn = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, options, user, options, contracts, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //set custom title
                        this.title = "Auth Login and send user to home page";
                        email = req.body.email;
                        password = req.body.password;
                        //if email or password are not provided => here we could make one more class who will take care about validation of our fields
                        if (email == '' || password == '') {
                            options = {
                                "message": "Pls fill all fields",
                            };
                            //render template
                            this.render(req, res, "index", options);
                        }
                        return [4 /*yield*/, UserModel_1.User.exist(email, password)];
                    case 1:
                        user = _a.sent();
                        if (!(user == false)) return [3 /*break*/, 2];
                        options = {
                            "message": "Incoret user or password!",
                        };
                        //render template
                        this.render(req, res, "index", options);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ContractModel_1.Contract.takeAll(user)];
                    case 3:
                        contracts = _a.sent();
                        req.session.userId = user['id'];
                        console.log("SVII OVII UGOVORI");
                        console.log(contracts);
                        options = {
                            "user": user,
                            "contracts": contracts
                        };
                        //render template
                        this.render(req, res, "home", options);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get routre for register
    UserController.prototype.register = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                //set custom title
                this.title = "Register user view page";
                options = {
                    "message": "",
                };
                //render template
                this.render(req, res, "register", options);
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.registerAuth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, options, user_status, options, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //set custom title
                        this.title = "Register user view page";
                        email = req.body.email;
                        password = req.body.password;
                        //if email or password are not provided
                        if (email == '' || password == '') {
                            options = {
                                "message": "Pls fill all input fields",
                            };
                            //render template
                            this.render(req, res, "register", options);
                        }
                        return [4 /*yield*/, UserModel_1.User.existEmail(email)];
                    case 1:
                        user_status = _a.sent();
                        if (!(user_status == false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, new UserModel_1.User(email, password)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        options = {
                            "message": "Enter your credentials",
                        };
                        //render template
                        this.render(req, res, "index", options);
                        return [3 /*break*/, 5];
                    case 4:
                        options = {
                            "message": "email is allready taken",
                        };
                        //render template
                        this.render(req, res, "register", options);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //logOut route
    UserController.prototype.logOut = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //set custom title
                this.title = "LogOut page logic (delete cookie)";
                delete req.session.userId;
                if (req.session.user && req.cookies.user_sid) {
                    res.clearCookie('user_sid');
                    res.redirect('/');
                }
                else {
                    res.redirect('/');
                }
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}(BaseController_1.BaseController));
exports.UserController = UserController;
