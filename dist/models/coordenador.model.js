"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordenadorModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class CoordenadorModel {
    static async getAll() {
        const [rows] = await database_1.default.query('SELECT * FROM coordenadores');
        return rows;
    }
    static async getById(id) {
        const [rows] = await database_1.default.query('SELECT * FROM coordenadores WHERE id = ?', [id]);
        return rows[0] || null;
    }
    static async create(coordenador) {
        const [result] = await database_1.default.query('INSERT INTO coordenadores SET ?', [coordenador]);
        return result.insertId;
    }
    static async update(id, coordenador) {
        const [result] = await database_1.default.query('UPDATE coordenadores SET ? WHERE id = ?', [coordenador, id]);
        return result.affectedRows > 0;
    }
    static async delete(id) {
        const [result] = await database_1.default.query('DELETE FROM coordenadores WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
exports.CoordenadorModel = CoordenadorModel;
