"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var person_1 = require("./person");
var Woman = /** @class */ (function (_super) {
    __extends(Woman, _super);
    function Woman(name, lastName, job) {
        if (job === void 0) {
            job = null;
        }
        var _this = _super.call(this, name, lastName) || this;
        _this.job = job;
        return _this;
    }
    Woman.prototype.info = function () {
        return "I am " + this.name + " " + this.lastName + " and i am " + this.job + "!!";
    };
    Woman.prototype.prviCallback = function (parametar, callback) {
        console.log(parametar);
        var num = Math.random();
        if (num > 0.5)
            return callback('hajde_macko', num);
        else
            return callback('NijeProsao', num);
    };
    Woman.prototype.prviPromise = function (poruka) {
        return new Promise(function (resolve) {
            resolve({ nestso: "ajde bre promisu" });
        });
    };
    Woman.prototype.prviPromise1 = function (poruka) {
        var common = new Promise(function (resolve) {
            resolve({ nesto: "ovo je promis" });
        });
        return common.then(function (c) { return c; });
    };
    return Woman;
}(person_1.Person));
exports.Woman = Woman;
