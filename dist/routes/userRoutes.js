"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// cree un client
router.post("/client", userController_1.UserController.creatClient);
// cree un manager
router.post("/manager", userController_1.UserController.creatManager);
// cree un user
router.post("/user", userController_1.UserController.creatUser);
//--------------------------------------------------------------------------------
// recupere tous les clients de la DBB
router.get("/clients", userController_1.UserController.getClient);
// recupere tous les managers de la DBB
router.get("/managers", userController_1.UserController.getManager);
// recupere tous les users de la BDD
router.get("/users", userController_1.UserController.getUser);
//--------------------------------------------------------------------------------
// mis à jour du client
router.put("/client/:id", userController_1.UserController.updateClient);
// mis à jour du manager
router.put("/manager/:id", userController_1.UserController.updateManager);
// mis à jour du user
router.put("/users/:id", userController_1.UserController.updateUser);
//--------------------------------------------------------------------------------
// supprimer client
router.delete("/client/:id", userController_1.UserController.deleteClient);
// supprimer manager
router.delete("/manager/:id", userController_1.UserController.deleteManager);
// supprimer user
router.delete("/users/:id", userController_1.UserController.deleteUser);
exports.default = router;
