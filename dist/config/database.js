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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// src/config/database.ts
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, sqlite_1.open)({
            filename: './database.sqlite',
            driver: sqlite3_1.default.Database,
        });
        yield db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        yield db.run(`
            INSERT INTO users (username, password, email, role) VALUES ('admin', 'admin', 'admin@example.com', 'admin')
            ON CONFLICT (username) DO NOTHING;
        `);
        return db;
    }
    catch (error) {
        console.error('Erreur lors de la connexion à la base de données:', error);
        throw new Error('Impossible de se connecter à la base de données.');
    }
});
exports.connectDB = connectDB;
