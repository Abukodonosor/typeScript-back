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
var db_1 = require("./db");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(username, password) {
        var _this = _super.call(this) || this;
        _this.username = username;
        _this.password = password;
        return _this;
    }
    User.fillAll = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.conn.query("SELECT * FROM user", [], function (err, rows) {
                resolve(rows);
            });
        });
    };
    return User;
}(db_1.DB));
exports.User = User;
