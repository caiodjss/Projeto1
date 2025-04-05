import { Request, Response } from 'express';
import { Horario } from '../interfaces/horario.interface';
import { HorarioModel } from '../models/horario.model';

export class HorarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const horarios = await HorarioModel.getAll();
      res.json(horarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar horários' });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const horario = await HorarioModel.getById(id);
      if (horario) {
        res.json(horario);
      } else {
        res.status(404).json({ message: 'Horário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar horário' });
    }
  }

  static async create(req: Request, res: Response) {
    const horarioData: Horario = req.body;
    try {
      const id = await HorarioModel.create(horarioData);
      res.status(201).json({ id, ...horarioData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar horário' });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const horarioData: Horario = req.body;
    try {
      const success = await HorarioModel.update(id, horarioData);
      if (success) {
        res.json({ id, ...horarioData });
      } else {
        res.status(404).json({ message: 'Horário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar horário' });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const success = await HorarioModel.delete(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Horário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar horário' });
    }
  }

  static async getByDocente(req: Request, res: Response) {
    const docenteId = parseInt(req.params.docenteId);
    try {
      const horarios = await HorarioModel.getByDocenteId(docenteId);
      res.json(horarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar horários do docente' });
    }
  }

  static async getByTurma(req: Request, res: Response) {
    const turmaId = parseInt(req.params.turmaId);
    try {
      const horarios = await HorarioModel.getByTurmaId(turmaId);
      res.json(horarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar horários da turma' });
    }
  }
}