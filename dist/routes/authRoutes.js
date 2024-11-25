"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Routes de connexion
router.post("/register", authController_1.AuthController.register);
router.post("/login", authController_1.AuthController.login);
// Nouvelle route : demande de réinitialisation de mot de passe
router.post("/request-password-reset", authController_1.AuthController.requestPasswordReset);
// Nouvelle route : réinitialisation de mot de passe
//router.post("/auth/reset-password", AuthController.resetPassword);
exports.default = router;
