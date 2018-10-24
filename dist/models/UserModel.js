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
var DB_1 = require("./DB");
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users(email, password, username) {
        var _this = _super.call(this) || this;
        _this.email = email;
        _this.password = password;
        _this.username = username;
        return _this;
    }
    Users.save = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.conn.query("SELECT * FROM user", [], function (err, rows) {
                resolve(rows);
            });
        });
    };
    return Users;
}(DB_1.DB));
exports.Users = Users;
