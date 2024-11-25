"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.delUser = exports.getUser = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
// src/models/userModel.ts
const database_1 = require("../config/database");
// Fonction pour créer un utilisateur
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectDB)();
        const query = `
        INSERT INTO users (username, email, password, role)
        VALUES (?, ?, ?, ?)
      `;
        yield db.run(query, [user.username, user.email, user.password, user.role]);
    }
    catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw error;
    }
});
exports.createUser = createUser;
// Fonction pour trouver un utilisateur par email
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectDB)();
        return yield db.get(`SELECT * FROM users WHERE email = ?`, [email]);
    }
    catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur par email:', error);
        throw error;
    }
});
exports.findUserByEmail = findUserByEmail;
// Fonction pour trouver un utilisateur par ID
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectDB)();
        return yield db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    }
    catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur par ID:', error);
        throw error;
    }
});
exports.findUserById = findUserById;
// Fonction pour obtenir tous les utilisateurs
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectDB)();
        return yield db.all(`SELECT * FROM users`);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        throw error;
    }
});
exports.getUser = getUser;
// Fonction pour supprimer un utilisateur
const delUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectDB)();
        yield db.run(`DELETE FROM users WHERE id = ?`, [id]);
    }
    catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        throw error;
    }
});
exports.delUser = delUser;
// Fonction pour mettre à jour un utilisateur
const editUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, database_1.connectDB)();
        const query = `
        UPDATE users
        SET username = ?, email = ?, password = ?, role = ?
        WHERE id = ?
      `;
        yield db.run(query, [user.username, user.email, user.password, user.role, user.id]);
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        throw error;
    }
});
exports.editUser = editUser;
