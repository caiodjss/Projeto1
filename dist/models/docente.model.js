"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocenteModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class DocenteModel {
    static async getAll() {
        const [rows] = await database_1.default.query('SELECT * FROM docentes');
        return rows;
    }
    static async getById(id) {
        const [rows] = await database_1.default.query('SELECT * FROM docentes WHERE id = ?', [id]);
        return rows[0] || null;
    }
    static async create(docente) {
        const [result] = await database_1.default.query('INSERT INTO docentes SET ?', [docente]);
        return result.insertId;
    }
    static async update(id, docente) {
        const [result] = await database_1.default.query('UPDATE docentes SET ? WHERE id = ?', [docente, id]);
        return result.affectedRows > 0;
    }
    static async delete(id) {
        const [result] = await database_1.default.query('DELETE FROM docentes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    static async getHorariosByDocenteId(docenteId) {
        const [rows] = await database_1.default.query(`
          SELECT h.*, t.nome as turma_nome 
          FROM horarios_docentes h
          JOIN turmas t ON h.turma_id = t.id
          WHERE h.docente_id = ?
          ORDER BY h.dia_semana, h.hora_inicio
        `, [docenteId]);
        return rows;
    }
}
exports.DocenteModel = DocenteModel;
