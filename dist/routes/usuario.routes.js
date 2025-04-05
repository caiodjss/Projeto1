"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const usuario_controller_1 = require("../controllers/usuario.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.AuthController.login);
router.post('/register', auth_controller_1.AuthController.register);
router.use(auth_middleware_1.authenticate);
router.get('/', (0, auth_middleware_1.authorize)(['coordenador']), usuario_controller_1.UsuarioController.getAll);
router.get('/:id', (0, auth_middleware_1.authorize)(['coordenador']), usuario_controller_1.UsuarioController.getById);
router.post('/', (0, auth_middleware_1.authorize)(['coordenador']), usuario_controller_1.UsuarioController.create);
router.put('/:id', (0, auth_middleware_1.authorize)(['coordenador']), usuario_controller_1.UsuarioController.update);
router.delete('/:id', (0, auth_middleware_1.authorize)(['coordenador']), usuario_controller_1.UsuarioController.delete);
router.get('/me', usuario_controller_1.UsuarioController.getCurrentUser);
router.put('/me/update-password', usuario_controller_1.UsuarioController.updatePassword);
exports.default = router;
