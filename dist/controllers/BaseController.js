"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Constructor
 *
 * @class BaseRoute
 */
var BaseController = /** @class */ (function () {
    /**
     * Constructor
     */
    function BaseController() {
        //initialize variables
        this.title = "freak_out";
        this.scripts = [];
    }
    /**
     * Add a JS external file to the request.
     */
    BaseController.prototype.addScript = function (src) {
        this.scripts.push(src);
        return this;
    };
    /**
     * Render a page.
     */
    BaseController.prototype.render = function (req, res, view, options) {
        //add constants
        res.locals.BASE_URL = "/";
        //add scripts
        res.locals.scripts = this.scripts;
        //add title
        res.locals.title = this.title;
        //render view
        res.render(view, options);
    };
    return BaseController;
}());
exports.BaseController = BaseController;
