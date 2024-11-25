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
exports.UserController = void 0;
const data_source_1 = require("../config/data-source");
const Managers_1 = require("../models/users/Managers");
const Client_1 = require("../models/users/Client");
const Users_1 = require("../models/users/Users");
const Admin_1 = require("../models/users/Admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    static creatClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, email, password, birthDate, phoneNumber, gender, address, profilePicture, role } = req.body;
            // Vérification des champs obligatoires
            if (!fullName || !username || !email || !password || !birthDate || !phoneNumber || !gender || !address || !role) {
                res.status(400).json({ error: "Tous les champs sont requis." });
                return;
            }
            try {
                // Vérification de l'existence de l'utilisateur
                const existingUser = yield UserController.findUserAcrossEntities(email);
                if (existingUser) {
                    res.status(400).json({ error: 'L’utilisateur existe déjà.' });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newClient = new Client_1.Client();
                Object.assign(newClient, {
                    fullName, username, email,
                    password: hashedPassword,
                    birthDate, phoneNumber,
                    gender, address,
                    profilePicture, role
                });
                yield data_source_1.AppDataSource.manager.save(newClient);
                res.status(201).json({ message: 'Client créé avec succès.' });
            }
            catch (error) {
                console.error("Erreur lors de l'inscription :", error);
                res.status(500).json({ error: "Erreur lors de l'inscription.", details: error });
            }
        });
    }
    static creatManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, email, password, birthDate, phoneNumber, gender, address, profilePicture, clientId, role } = req.body;
            // Vérification des champs obligatoires
            if (!fullName || !username || !email || !password || !birthDate || !phoneNumber || !gender || !address || !role) {
                res.status(400).json({ error: "Tous les champs sont requis." });
                return;
            }
            try {
                // Vérification de l'existence de l'utilisateur
                const existingUser = yield UserController.findUserAcrossEntities(email);
                if (existingUser) {
                    res.status(400).json({ error: 'L’utilisateur existe déjà.' });
                    return;
                }
                const client = yield data_source_1.AppDataSource.getRepository(Client_1.Client).findOne({ where: { id: clientId } });
                if (!client) {
                    res.status(404).json({ error: "Client introuvable." });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newManager = new Managers_1.Manager();
                Object.assign(newManager, {
                    fullName, username, email,
                    password: hashedPassword,
                    birthDate, phoneNumber, gender,
                    address, profilePicture, client, role
                });
                yield data_source_1.AppDataSource.manager.save(newManager);
                res.status(201).json({ message: 'Manager créé avec succès.' });
            }
            catch (error) {
                console.error("Erreur lors de l'inscription :", error);
                res.status(500).json({ error: "Erreur lors de l'inscription.", details: error });
            }
        });
    }
    static creatUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, email, password, birthDate, phoneNumber, gender, address, profilePicture, managerId, role } = req.body;
            // Vérification des champs obligatoires
            if (!fullName || !username || !email || !password || !birthDate || !phoneNumber || !gender || !address || !role) {
                res.status(400).json({ error: "Tous les champs sont requis." });
                return;
            }
            try {
                // Vérification de l'existence de l'utilisateur
                const existingUser = yield UserController.findUserAcrossEntities(email);
                if (existingUser) {
                    res.status(400).json({ error: 'L’utilisateur existe déjà.' });
                    return;
                }
                const manager = yield data_source_1.AppDataSource.getRepository(Managers_1.Manager).findOne({ where: { id: managerId } });
                if (!manager) {
                    res.status(404).json({ error: "Manager introuvable." });
                    return;
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = new Users_1.User();
                Object.assign(newUser, {
                    fullName, username, email,
                    password: hashedPassword,
                    birthDate, phoneNumber, gender, address,
                    profilePicture, manager, role
                });
                yield data_source_1.AppDataSource.manager.save(newUser);
                res.status(201).json({ message: 'Utilisateur créé avec succès.' });
            }
            catch (error) {
                console.error("Erreur lors de l'inscription :", error);
                res.status(500).json({ error: "Erreur lors de l'inscription.", details: error });
            }
        });
    }
    //--------------------------------------------------------------------------------
    static getClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
                // Requête pour récupérer tous les utilisateurs avec le rôle "manager"
                const client = yield clientRepository.find({
                    where: { role: 'client' },
                });
                console.log('client:', client);
                res.status(200).json(client);
            }
            catch (error) {
                console.error('Erreur lors de la récupération des managers :', error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    static getManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const managerRepository = data_source_1.AppDataSource.getRepository(Managers_1.Manager);
                // Requête pour récupérer tous les utilisateurs avec le rôle "manager"
                const managers = yield managerRepository.find({
                    where: { role: 'manager' },
                });
                res.status(200).json(managers);
            }
            catch (error) {
                console.error('Erreur lors de la récupération des managers :', error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRepository = data_source_1.AppDataSource.getRepository(Users_1.User);
                // Requête pour récupérer tous les utilisateurs avec le rôle "manager"
                const users = yield userRepository.find({
                    where: { role: 'manager' },
                });
                res.status(200).json(users);
            }
            catch (error) {
                console.error('Erreur lors de la récupération des managers :', error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    //--------------------------------------------------------------------------------
    static updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // ID de l'utilisateur à mettre à jour
                const updateData = req.body; // Données envoyées pour la mise à jour
                // Vérifiez que l'ID est un entier valide
                if (!id || isNaN(Number(id))) {
                    res.status(400).json({ message: 'ID utilisateur invalide.' });
                }
                const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
                // Rechercher l'utilisateur par son ID
                const userClient = yield clientRepository.findOneBy({ id: parseInt(id) });
                if (!userClient) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Mettre à jour les champs
                Object.assign(userClient, updateData);
                // Sauvegarde des modifications dans la base de données
                const updatedClient = yield clientRepository.save(userClient);
                res.status(200).json({
                    message: "Utilisateur mis à jour avec succès.",
                    user: updatedClient,
                });
            }
            catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    static updateManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // ID de l'utilisateur à mettre à jour
                const updateData = req.body; // Données envoyées pour la mise à jour
                // Vérifiez que l'ID est un entier valide
                if (!id || isNaN(Number(id))) {
                    res.status(400).json({ message: 'ID utilisateur invalide.' });
                }
                const managerRepository = data_source_1.AppDataSource.getRepository(Managers_1.Manager);
                // Rechercher l'utilisateur par son ID
                const userManager = yield managerRepository.findOneBy({ id: parseInt(id) });
                if (!userManager) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Mettre à jour les champs
                Object.assign(userManager, updateData);
                // Sauvegarde des modifications dans la base de données
                const updatedManager = yield managerRepository.save(userManager);
                res.status(200).json({
                    message: "Utilisateur mis à jour avec succès.",
                    user: updatedManager,
                });
            }
            catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // ID de l'utilisateur à mettre à jour
                const updateData = req.body; // Données envoyées pour la mise à jour
                // Vérifiez que l'ID est un entier valide
                if (!id || isNaN(Number(id))) {
                    res.status(400).json({ message: 'ID utilisateur invalide.' });
                }
                const userRepository = data_source_1.AppDataSource.getRepository(Users_1.User);
                // Rechercher l'utilisateur par son ID
                const user = yield userRepository.findOneBy({ id: parseInt(id) });
                if (!user) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Mettre à jour les champs
                Object.assign(user, updateData);
                // Sauvegarde des modifications dans la base de données
                const updatedUser = yield userRepository.save(user);
                res.status(200).json({
                    message: "Utilisateur mis à jour avec succès.",
                    user: updatedUser,
                });
            }
            catch (error) {
                console.error("Erreur lors de la mise à jour :", error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    //--------------------------------------------------------------------------------
    static deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // ID de l'utilisateur à supprimer
                // Vérifiez que l'ID est un entier valide
                if (!id || isNaN(Number(id))) {
                    res.status(400).json({ message: 'ID utilisateur invalide.' });
                    return;
                }
                const clientRepository = data_source_1.AppDataSource.getRepository(Client_1.Client);
                // Rechercher l'utilisateur par son ID
                const userClient = yield clientRepository.findOneBy({ id: parseInt(id) });
                if (!userClient) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Suppression de l'utilisateur
                yield clientRepository.remove(userClient);
                res.status(200).json({ message: "Utilisateur supprimé avec succès." });
            }
            catch (error) {
                console.error("Erreur lors de la suppression :", error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    static deleteManager(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // ID de l'utilisateur à supprimer
                // Vérifiez que l'ID est un entier valide
                if (!id || isNaN(Number(id))) {
                    res.status(400).json({ message: 'ID utilisateur invalide.' });
                    return;
                }
                const managerRepository = data_source_1.AppDataSource.getRepository(Managers_1.Manager);
                // Rechercher l'utilisateur par son ID
                const userManager = yield managerRepository.findOneBy({ id: parseInt(id) });
                if (!userManager) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Suppression de l'utilisateur
                yield managerRepository.remove(userManager);
                res.status(200).json({ message: "Utilisateur supprimé avec succès." });
            }
            catch (error) {
                console.error("Erreur lors de la suppression :", error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; // ID de l'utilisateur à supprimer
                // Vérifiez que l'ID est un entier valide
                if (!id || isNaN(Number(id))) {
                    res.status(400).json({ message: 'ID utilisateur invalide.' });
                    return;
                }
                const userRepository = data_source_1.AppDataSource.getRepository(Users_1.User);
                // Rechercher l'utilisateur par son ID
                const user = yield userRepository.findOneBy({ id: parseInt(id) });
                if (!user) {
                    res.status(404).json({ message: "Utilisateur non trouvé." });
                    return;
                }
                // Suppression de l'utilisateur
                yield userRepository.remove(user);
                res.status(200).json({ message: "Utilisateur supprimé avec succès." });
            }
            catch (error) {
                console.error("Erreur lors de la suppression :", error);
                res.status(500).json({ message: `Erreur : ${error}` });
            }
        });
    }
    //--------------------------------------------------------------------------------
    static findUserAcrossEntities(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = [Admin_1.Admin, Users_1.User, Client_1.Client, Managers_1.Manager];
            for (const Entity of entities) {
                try {
                    const repository = data_source_1.AppDataSource.getRepository(Entity);
                    const user = yield repository
                        .createQueryBuilder('entity')
                        .where('entity.email = :email', { email })
                        .getOne();
                    if (user) {
                        return user;
                    }
                }
                catch (error) {
                    console.error(`Erreur lors de la recherche dans ${Entity.name}:`, error);
                }
            }
            return null;
        });
    }
}
exports.UserController = UserController;
;
