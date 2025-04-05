import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioModel } from '../models/usuario.model';

export class UsuarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioModel.getAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const usuario = await UsuarioModel.getById(id);
      if (usuario) {
        const { senha, ...usuarioSemSenha } = usuario;
        res.json(usuarioSemSenha);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  }

  static async create(req: Request, res: Response) {
    const usuarioData: Usuario = req.body;
    try {
      const hashedPassword = await bcrypt.hash(usuarioData.senha, 10);
      usuarioData.senha = hashedPassword;
      
      const id = await UsuarioModel.create(usuarioData);
      res.status(201).json({ id, ...usuarioData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar usuário' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const usuarioData: Partial<Usuario> = req.body;
    
    try {
      if (usuarioData.senha) {
        usuarioData.senha = await bcrypt.hash(usuarioData.senha, 10);
      }
      
      const success = await UsuarioModel.update(id, usuarioData);
      if (success) {
        res.json({ id, ...usuarioData });
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const success = await UsuarioModel.delete(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    const user = (req as any).user;
    try {
      const usuario = await UsuarioModel.getById(user.id);
      if (usuario) {
        const { senha, ...usuarioSemSenha } = usuario;
        res.json(usuarioSemSenha);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  }

  static async updatePassword(req: Request, res: Response) {
    const user = (req as any).user;
    const { senhaAtual, novaSenha } = req.body;
    
    try {
      const usuario = await UsuarioModel.getById(user.id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const isMatch = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!isMatch) {
        return res.status(401).json({ message: 'Senha atual incorreta' });
      }
      
      const hashedPassword = await bcrypt.hash(novaSenha, 10);
      await UsuarioModel.update(user.id, { senha: hashedPassword });
      
      res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar senha' });
    }
  }
}