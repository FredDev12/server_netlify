"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Contract_1 = require("../models/task/Contract");
const Users_1 = require("../models/users/Users");
const Client_1 = require("../models/users/Client");
const Managers_1 = require("../models/users/Managers");
const EntityBase_1 = require("../models/users/EntityBase");
const Admin_1 = require("../models/users/Admin");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite", // Type de base de données
    database: "database.sqlite", // Nom de la base de données
    synchronize: true, // Synchronisation automatique des entités avec la base
    logging: false, // Activer le logging des requêtes SQL
    entities: [Contract_1.Contract, Users_1.User, Client_1.Client, Managers_1.Manager, EntityBase_1.EntityBase, Admin_1.Admin], // Liste des entités utilisées
});
