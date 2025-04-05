import pool from '../config/database';
import { Horario } from '../interfaces/horario.interface';

export class HorarioModel {
  static async getAll(): Promise<Horario[]> {
    const [rows] = await pool.query('SELECT * FROM horarios_docentes');
    return rows as Horario[];
  }

  static async getById(id: number): Promise<Horario | null> {
    const [rows] = await pool.query('SELECT * FROM horarios_docentes WHERE id = ?', [id]);
    return (rows as Horario[])[0] || null;
  }

  static async create(horario: Horario): Promise<number> {
    const [result] = await pool.query('INSERT INTO horarios_docentes SET ?', [horario]);
    return (result as any).insertId;
  }

  static async update(id: number, horario: Horario): Promise<boolean> {
    const [result] = await pool.query('UPDATE horarios_docentes SET ? WHERE id = ?', [horario, id]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM horarios_docentes WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }

  static async getByDocenteId(docenteId: number): Promise<any[]> {
    const [rows] = await pool.query(`
      SELECT h.*, t.nome as turma_nome 
      FROM horarios_docentes h
      JOIN turmas t ON h.turma_id = t.id
      WHERE h.docente_id = ?
      ORDER BY h.dia_semana, h.hora_inicio
    `, [docenteId]);
    return rows as any[];
  }

  static async getByTurmaId(turmaId: number): Promise<any[]> {
    const [rows] = await pool.query(`
      SELECT h.*, d.nome as docente_nome 
      FROM horarios_docentes h
      JOIN docentes d ON h.docente_id = d.id
      WHERE h.turma_id = ?
      ORDER BY h.dia_semana, h.hora_inicio
    `, [turmaId]);
    return rows as any[];
  }

  static async getTurmaById(turmaId: number): Promise<any> {
    const [rows] = await pool.query('SELECT * FROM turmas WHERE id = ?', [turmaId]);
    return (rows as any[])[0] || null;
  }
}