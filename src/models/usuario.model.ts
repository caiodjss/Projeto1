import pool from '../config/database';
import { Usuario } from '../interfaces/usuario.interface';

export class UsuarioModel {
  static async getAll(): Promise<Usuario[]> {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows as Usuario[];
  }

  static async getById(id: number): Promise<Usuario | null> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return (rows as Usuario[])[0] || null;
  }

  static async getByUsuario(usuario: string): Promise<Usuario | null> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return (rows as Usuario[])[0] || null;
  }

  static async create(usuario: Usuario): Promise<number> {
    const [result] = await pool.query('INSERT INTO usuarios SET ?', [usuario]);
    return (result as any).insertId;
  }

  static async update(id: number, usuario: Partial<Usuario>): Promise<boolean> {
    const [result] = await pool.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}