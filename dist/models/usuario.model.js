"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class UsuarioModel {
    static async getAll() {
        const [rows] = await database_1.default.query('SELECT * FROM usuarios');
        return rows;
    }
    static async getById(id) {
        const [rows] = await database_1.default.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0] || null;
    }
    static async getByUsuario(usuario) {
        const [rows] = await database_1.default.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        return rows[0] || null;
    }
    static async create(usuario) {
        const [result] = await database_1.default.query('INSERT INTO usuarios SET ?', [usuario]);
        return result.insertId;
    }
    static async update(id, usuario) {
        const [result] = await database_1.default.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id]);
        return result.affectedRows > 0;
    }
    static async delete(id) {
        const [result] = await database_1.default.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
exports.UsuarioModel = UsuarioModel;
