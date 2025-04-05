import pool from '../config/database';
import { Docente } from '../interfaces/docente.interface';

export class DocenteModel {
    static async getAll(): Promise<Docente[]> {
        const [rows] = await pool.query('SELECT * FROM docentes');
        return rows as Docente[];
    }
    static async getById(id: number): Promise<Docente | null> {
        const [rows] = await pool.query('SELECT * FROM docentes WHERE id = ?', [id]);
        return (rows as Docente[])[0] || null;
    }
    static async create(docente: Docente): Promise<number> {
        const [result] = await pool.query('INSERT INTO docentes SET ?', [docente]);
        return (result as any).insertId;
    }
    static async update(id: number, docente: Docente): Promise<boolean> {
        const [result] = await pool.query('UPDATE docentes SET ? WHERE id = ?', [docente, id]);
        return (result as any).affectedRows > 0;
    }
    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query('DELETE FROM docentes WHERE id = ?', [id]);
        return (result as any).affectedRows > 0;
    }
    static async getHorariosByDocenteId(docenteId: number): Promise<any[]> {
        const [rows] = await pool.query(`
          SELECT h.*, t.nome as turma_nome 
          FROM horarios_docentes h
          JOIN turmas t ON h.turma_id = t.id
          WHERE h.docente_id = ?
          ORDER BY h.dia_semana, h.hora_inicio
        `, [docenteId]);
        return rows as any[];
    }
}