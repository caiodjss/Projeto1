"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_model_1 = require("../models/usuario.model");
dotenv_1.default.config();
class AuthService {
    static async login(usuario, senha) {
        const user = await usuario_model_1.UsuarioModel.getByUsuario(usuario);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const isMatch = await bcrypt_1.default.compare(senha, user.senha);
        if (!isMatch) {
            throw new Error('Senha incorreta');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            usuario: user.usuario,
            nivel_acesso: user.nivel_acesso,
            docente_id: user.docente_id,
            coordenador_id: user.coordenador_id
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    static async register(userData) {
        const hashedPassword = await bcrypt_1.default.hash(userData.senha, 10);
        userData.senha = hashedPassword;
        return await usuario_model_1.UsuarioModel.create(userData);
    }
}
exports.AuthService = AuthService;
