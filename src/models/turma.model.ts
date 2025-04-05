import pool from '../config/database';
import { Turma } from '../interfaces/turma.interface';

export class TurmaModel {
  static async getAll(): Promise<Turma[]> {
    const [rows] = await pool.query('SELECT * FROM turmas');
    return rows as Turma[];
  }

  static async getById(id: number): Promise<Turma | null> {
    const [rows] = await pool.query('SELECT * FROM turmas WHERE id = ?', [id]);
    return (rows as Turma[])[0] || null;
  }

  static async create(turma: Turma): Promise<number> {
    const [result] = await pool.query('INSERT INTO turmas SET ?', [turma]);
    return (result as any).insertId;
  }

  static async update(id: number, turma: Turma): Promise<boolean> {
    const [result] = await pool.query('UPDATE turmas SET ? WHERE id = ?', [turma, id]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM turmas WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }

  static async getHorariosByTurmaId(turmaId: number): Promise<any[]> {
    const [rows] = await pool.query(`
      SELECT h.*, d.nome as docente_nome 
      FROM horarios_docentes h
      JOIN docentes d ON h.docente_id = d.id
      WHERE h.turma_id = ?
      ORDER BY h.dia_semana, h.hora_inicio
    `, [turmaId]);
    return rows as any[];
  }
}