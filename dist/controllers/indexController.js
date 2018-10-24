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
Object.defineProperty(exports, "__esModule", { value: true });
var BaseController_1 = require("./BaseController");
/**
 * Controller fo
 */
var IndexController = /** @class */ (function (_super) {
    __extends(IndexController, _super);
    /**
     * Constructor
     */
    function IndexController() {
        return _super.call(this) || this;
    }
    IndexController.create = function (router) {
        //log
        console.log("[IndexController::create] Creating IndexController route:");
        //add page route
        router.get("/", function (req, res, next) {
            new IndexController().index(req, res, next);
        });
        // add more routes
    };
    IndexController.prototype.index = function (req, res, next) {
        //set custom title
        this.title = "This is title of my action";
        //set options
        var options = {
            "message": "Lets freak out"
        };
        //render template
        this.render(req, res, "index", options);
    };
    return IndexController;
}(BaseController_1.BaseController));
exports.IndexController = IndexController;
