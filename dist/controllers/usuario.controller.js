"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_model_1 = require("../models/usuario.model");
class UsuarioController {
    static async getAll(req, res) {
        try {
            const usuarios = await usuario_model_1.UsuarioModel.getAll();
            res.json(usuarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuários' });
        }
    }
    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const usuario = await usuario_model_1.UsuarioModel.getById(id);
            if (usuario) {
                const { senha, ...usuarioSemSenha } = usuario;
                res.json(usuarioSemSenha);
            }
            else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }
    static async create(req, res) {
        const usuarioData = req.body;
        try {
            const hashedPassword = await bcrypt_1.default.hash(usuarioData.senha, 10);
            usuarioData.senha = hashedPassword;
            const id = await usuario_model_1.UsuarioModel.create(usuarioData);
            res.status(201).json({ id, ...usuarioData });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }
    static async update(req, res) {
        const id = parseInt(req.params.id);
        const usuarioData = req.body;
        try {
            if (usuarioData.senha) {
                usuarioData.senha = await bcrypt_1.default.hash(usuarioData.senha, 10);
            }
            const success = await usuario_model_1.UsuarioModel.update(id, usuarioData);
            if (success) {
                res.json({ id, ...usuarioData });
            }
            else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar usuário' });
        }
    }
    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const success = await usuario_model_1.UsuarioModel.delete(id);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar usuário' });
        }
    }
    static async getCurrentUser(req, res) {
        const user = req.user;
        try {
            const usuario = await usuario_model_1.UsuarioModel.getById(user.id);
            if (usuario) {
                const { senha, ...usuarioSemSenha } = usuario;
                res.json(usuarioSemSenha);
            }
            else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
    }
    static async updatePassword(req, res) {
        const user = req.user;
        const { senhaAtual, novaSenha } = req.body;
        try {
            const usuario = await usuario_model_1.UsuarioModel.getById(user.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            const isMatch = await bcrypt_1.default.compare(senhaAtual, usuario.senha);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha atual incorreta' });
            }
            const hashedPassword = await bcrypt_1.default.hash(novaSenha, 10);
            await usuario_model_1.UsuarioModel.update(user.id, { senha: hashedPassword });
            res.json({ message: 'Senha atualizada com sucesso' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar senha' });
        }
    }
}
exports.UsuarioController = UsuarioController;
