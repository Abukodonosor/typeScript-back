"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var configDB_1 = require("../config/configDB");
var DB = /** @class */ (function () {
    function DB() {
    }
    DB.init = function () {
        this.conn = mysql.createConnection(configDB_1.config);
        this.conn.connect();
    };
    DB.close = function () {
        this.conn.end(function (err) { });
    };
    return DB;
}());
exports.DB = DB;
