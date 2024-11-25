"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Managers_1 = require("./Managers");
const Contract_1 = require("../task/Contract");
const EntityBase_1 = require("./EntityBase");
let User = class User extends EntityBase_1.EntityBase {
};
exports.User = User;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Managers_1.Manager, (manager) => manager.users),
    __metadata("design:type", Managers_1.Manager)
], User.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Contract_1.Contract, (contract) => contract.users),
    __metadata("design:type", Contract_1.Contract)
], User.prototype, "contracts", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
