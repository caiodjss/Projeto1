"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../middlewares/auth.service");
/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Autenticação de usuários
 */
class AuthController {
    /**
   * @swagger
   * /api/usuarios/login:
   *   post:
   *     summary: Autentica um usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - usuario
   *               - senha
   *             properties:
   *               usuario:
   *                 type: string
   *               senha:
   *                 type: string
   *             example:
   *               usuario: admin
   *               senha: senha123
   *     responses:
   *       200:
   *         description: Token JWT
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *       401:
   *         description: Credenciais inválidas
   */
    static async login(req, res) {
        const { usuario, senha } = req.body;
        try {
            const token = await auth_service_1.AuthService.login(usuario, senha);
            res.json({ token });
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    }
    static async register(req, res) {
        const userData = req.body;
        try {
            const user = await auth_service_1.AuthService.register(userData);
            res.status(201).json(user);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Erro ao registrar usuário' });
        }
    }
}
exports.AuthController = AuthController;
