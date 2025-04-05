import pool from '../config/database';
import { Coordenador } from '../interfaces/coordenador.interface';

export class CoordenadorModel {
  static async getAll(): Promise<Coordenador[]> {
    const [rows] = await pool.query('SELECT * FROM coordenadores');
    return rows as Coordenador[];
  }

  static async getById(id: number): Promise<Coordenador | null> {
    const [rows] = await pool.query('SELECT * FROM coordenadores WHERE id = ?', [id]);
    return (rows as Coordenador[])[0] || null;
  }

  static async create(coordenador: Coordenador): Promise<number> {
    const [result] = await pool.query('INSERT INTO coordenadores SET ?', [coordenador]);
    return (result as any).insertId;
  }

  static async update(id: number, coordenador: Coordenador): Promise<boolean> {
    const [result] = await pool.query('UPDATE coordenadores SET ? WHERE id = ?', [coordenador, id]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM coordenadores WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}