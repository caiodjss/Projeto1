import { Request, Response } from 'express';
import { Coordenador } from '../interfaces/coordenador.interface';
import { CoordenadorModel } from '../models/coordenador.model';

export class CoordenadorController {
  static async getAll(req: Request, res: Response) {
    try {
      const coordenadores = await CoordenadorModel.getAll();
      res.json(coordenadores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar coordenadores' });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const coordenador = await CoordenadorModel.getById(id);
      if (coordenador) {
        res.json(coordenador);
      } else {
        res.status(404).json({ message: 'Coordenador não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar coordenador' });
    }
  }

  static async create(req: Request, res: Response) {
    const coordenadorData: Coordenador = req.body;
    try {
      const id = await CoordenadorModel.create(coordenadorData);
      res.status(201).json({ id, ...coordenadorData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar coordenador' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const coordenadorData: Coordenador = req.body;
    try {
      const success = await CoordenadorModel.update(id, coordenadorData);
      if (success) {
        res.json({ id, ...coordenadorData });
      } else {
        res.status(404).json({ message: 'Coordenador não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar coordenador' });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const success = await CoordenadorModel.delete(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Coordenador não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar coordenador' });
    }
  }
}