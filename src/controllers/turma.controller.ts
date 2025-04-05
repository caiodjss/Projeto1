import { Request, Response } from 'express';
import { Turma } from '../interfaces/turma.interface';
import { TurmaModel } from '../models/turma.model';

export class TurmaController {
  static async getAll(req: Request, res: Response) {
    try {
      const turmas = await TurmaModel.getAll();
      res.json(turmas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar turmas' });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const turma = await TurmaModel.getById(id);
      if (turma) {
        res.json(turma);
      } else {
        res.status(404).json({ message: 'Turma não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar turma' });
    }
  }

  static async create(req: Request, res: Response) {
    const turmaData: Turma = req.body;
    try {
      const id = await TurmaModel.create(turmaData);
      res.status(201).json({ id, ...turmaData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar turma' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const turmaData: Turma = req.body;
    try {
      const success = await TurmaModel.update(id, turmaData);
      if (success) {
        res.json({ id, ...turmaData });
      } else {
        res.status(404).json({ message: 'Turma não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar turma' });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const success = await TurmaModel.delete(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Turma não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar turma' });
    }
  }

  static async getHorarios(req: Request, res: Response) {
    const turmaId = parseInt(req.params.id);
    try {
      const horarios = await TurmaModel.getHorariosByTurmaId(turmaId);
      res.json(horarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar horários da turma' });
    }
  }
}