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
exports.Manager = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("./Client");
const Users_1 = require("./Users");
const Contract_1 = require("../task/Contract");
const EntityBase_1 = require("./EntityBase");
let Manager = class Manager extends EntityBase_1.EntityBase {
};
exports.Manager = Manager;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_1.Client, (client) => client.managers),
    __metadata("design:type", Client_1.Client)
], Manager.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users_1.User, (user) => user.manager),
    __metadata("design:type", Array)
], Manager.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Contract_1.Contract, (contract) => contract.manager),
    __metadata("design:type", Array)
], Manager.prototype, "contracts", void 0);
exports.Manager = Manager = __decorate([
    (0, typeorm_1.Entity)()
], Manager);
