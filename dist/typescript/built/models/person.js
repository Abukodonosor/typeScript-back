"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name, lastName) {
        this.name = name;
        this.lastName = lastName;
    }
    Person.prototype.setName = function (newName) {
        this.name = newName;
    };
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.info = function () {
        return "About my info: " + this.name + " " + this.lastName;
    };
    return Person;
}());
exports.Person = Person;
