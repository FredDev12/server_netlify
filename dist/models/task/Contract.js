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
exports.Contract = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = require("../users/Client");
const Managers_1 = require("../users/Managers");
const Users_1 = require("../users/Users");
let Contract = class Contract {
};
exports.Contract = Contract;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contract.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Contract.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Client_1.Client, (client) => client.contracts),
    __metadata("design:type", Client_1.Client)
], Contract.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Managers_1.Manager, (manager) => manager.contracts),
    __metadata("design:type", Managers_1.Manager)
], Contract.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Users_1.User, (user) => user.contracts),
    __metadata("design:type", Array)
], Contract.prototype, "users", void 0);
exports.Contract = Contract = __decorate([
    (0, typeorm_1.Entity)()
], Contract);
