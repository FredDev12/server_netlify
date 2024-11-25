"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUtils_1 = require("../utils/authUtils");
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userController_1 = require("../controllers/userController");
const Admin_1 = require("../models/users/Admin");
const data_source_1 = require("../config/data-source");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { JWT_SECRET, EMAIL_USER, EMAIL_PASS, FRONTEND_URL } = process.env;
// Vérification des variables d'environnement
if (!JWT_SECRET || !EMAIL_USER || !EMAIL_PASS || !FRONTEND_URL) {
    throw new Error("Certains paramètres environnementaux sont manquants.");
}
// Créer le transporteur SMTP
const transporter = nodemailer_1.default.createTransport({
    //service: "Gmail",
    host: 'smtp.hostinger.com', // Serveur SMTP de Hostinger
    port: 587, // Port sécurisé SSL
    secure: false, // Utiliser SSL
    auth: {
        type: 'LOGIN', // Ou "PLAIN"
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Désactiver pour tester
        minVersion: 'TLSv1.2',
    },
    logger: true, // Active les logs
    debug: true, // Active les logs détaillés
});
class AuthController {
    // Générer un lien sécurisé pour la réinitialisation de mot de passe
    static requestPasswordReset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ message: "Email requis." });
                return;
            }
            try {
                // Vérifier si l'utilisateur existe
                const user = yield userController_1.UserController.findUserAcrossEntities(email);
                if (!user) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Générer un token JWT pour la réinitialisation
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
                const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;
                console.log("mail SMTP", EMAIL_USER);
                console.log("pass", EMAIL_PASS);
                console.log("mail user", email);
                console.log("token", JWT_SECRET);
                // Envoyer l'email avec le lien
                const info = yield transporter.sendMail({
                    from: EMAIL_USER,
                    to: email,
                    subject: "Réinitialisation de votre mot de passe",
                    html: `
                    <h1>Réinitialisation de mot de passe</h1>
                    <p>Vous avez demandé une réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour continuer :</p>
                    <a href="${resetLink}" target="_blank">Réinitialiser le mot de passe</a>
                    <p>Ce lien expirera dans 1 heure.</p>
                `,
                });
                console.log('E-mail envoyé avec succès : %s', info.messageId);
                res.status(200).json({ message: "Email de réinitialisation envoyé." });
            }
            catch (error) {
                console.error("Erreur lors de la réinitialisation :", error);
                res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
            }
        });
    }
    ;
    // Fonction d'inscription
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, email, password, birthDate, phoneNumber, gender, address, profilePicture, role } = req.body;
            console.log(req.body);
            // Vérification des champs obligatoires
            if (!fullName || !username || !email || !password || !birthDate || !phoneNumber || !gender || !address || !role) {
                res.status(400).json({ error: "Tous les champs sont requis." });
                return;
            }
            try {
                // Vérification de l'existence de l'utilisateur
                const existingUser = yield userController_1.UserController.findUserAcrossEntities(email);
                if (existingUser) {
                    res.status(400).json({ error: 'L’utilisateur existe déjà.' });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newAdmin = new Admin_1.Admin();
                Object.assign(newAdmin, {
                    fullName, username, email,
                    password: hashedPassword,
                    birthDate, phoneNumber,
                    gender, address,
                    profilePicture, role
                });
                yield data_source_1.AppDataSource.manager.save(newAdmin);
                res.status(201).json({ message: 'Admin créé avec succès.' });
            }
            catch (error) {
                console.error("Erreur lors de l'inscription :", error);
                res.status(500).json({ error: "Erreur lors de l'inscription.", details: error });
            }
        });
    }
    // Fonction de connexion
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log(req.body);
            // Validation des champs obligatoires
            if (!email || !password) {
                res.status(400).json({ error: 'Email et mot de passe sont requis.' });
                return;
            }
            try {
                const user = yield userController_1.UserController.findUserAcrossEntities(email);
                // Vérification si l'utilisateur existe
                if (!user) {
                    res.status(404).json({ message: 'Utilisateur non trouvé.' });
                    return;
                }
                // Vérification du mot de passe
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    res.status(401).json({ message: 'Identifiants invalides' });
                    return;
                }
                // Génération du token JWT
                const token = (0, authUtils_1.generateToken)({ userId: user.id }, '1h');
                res.status(200).json({ message: 'Connexion réussie.', token, userInfo: { role: user.role, username: user.username } });
            }
            catch (error) {
                console.error("Erreur lors de la connexion :", error);
                res.status(500).json({ error: "Erreur lors de la connexion.", details: error });
            }
        });
    }
    ;
}
exports.AuthController = AuthController;
