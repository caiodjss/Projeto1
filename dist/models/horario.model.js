"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class HorarioModel {
    static async getAll() {
        const [rows] = await database_1.default.query('SELECT * FROM horarios_docentes');
        return rows;
    }
    static async getById(id) {
        const [rows] = await database_1.default.query('SELECT * FROM horarios_docentes WHERE id = ?', [id]);
        return rows[0] || null;
    }
    static async create(horario) {
        const [result] = await database_1.default.query('INSERT INTO horarios_docentes SET ?', [horario]);
        return result.insertId;
    }
    static async update(id, horario) {
        const [result] = await database_1.default.query('UPDATE horarios_docentes SET ? WHERE id = ?', [horario, id]);
        return result.affectedRows > 0;
    }
    static async delete(id) {
        const [result] = await database_1.default.query('DELETE FROM horarios_docentes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
    static async getByDocenteId(docenteId) {
        const [rows] = await database_1.default.query(`
      SELECT h.*, t.nome as turma_nome 
      FROM horarios_docentes h
      JOIN turmas t ON h.turma_id = t.id
      WHERE h.docente_id = ?
      ORDER BY h.dia_semana, h.hora_inicio
    `, [docenteId]);
        return rows;
    }
    static async getByTurmaId(turmaId) {
        const [rows] = await database_1.default.query(`
      SELECT h.*, d.nome as docente_nome 
      FROM horarios_docentes h
      JOIN docentes d ON h.docente_id = d.id
      WHERE h.turma_id = ?
      ORDER BY h.dia_semana, h.hora_inicio
    `, [turmaId]);
        return rows;
    }
    static async getTurmaById(turmaId) {
        const [rows] = await database_1.default.query('SELECT * FROM turmas WHERE id = ?', [turmaId]);
        return rows[0] || null;
    }
}
exports.HorarioModel = HorarioModel;
