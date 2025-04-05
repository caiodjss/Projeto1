"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class TurmaModel {
    static async getAll() {
        const [rows] = await database_1.default.query('SELECT * FROM turmas');
        return rows;
    }
    static async getById(id) {
        const [rows] = await database_1.default.query('SELECT * FROM turmas WHERE id = ?', [id]);
        return rows[0] || null;
    }
    static async create(turma) {
        const [result] = await database_1.default.query('INSERT INTO turmas SET ?', [turma]);
        return result.insertId;
    }
    static async update(id, turma) {
        const [result] = await database_1.default.query('UPDATE turmas SET ? WHERE id = ?', [turma, id]);
        return result.affectedRows > 0;
    }
    static async delete(id) {
        const [result] = await database_1.default.query('DELETE FROM turmas WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    static async getHorariosByTurmaId(turmaId) {
        const [rows] = await database_1.default.query(`
      SELECT h.*, d.nome as docente_nome 
      FROM horarios_docentes h
      JOIN docentes d ON h.docente_id = d.id
      WHERE h.turma_id = ?
      ORDER BY h.dia_semana, h.hora_inicio
    `, [turmaId]);
        return rows;
    }
}
exports.TurmaModel = TurmaModel;
