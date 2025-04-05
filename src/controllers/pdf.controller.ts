import { Request, Response } from 'express';
import fs from 'fs';
import { PdfService } from '../services/pdf.services';

export class PdfController {
  static async generateHorarioTurma(req: Request, res: Response) {
    const turmaId = parseInt(req.params.turmaId);
    const periodo = req.query.periodo as 'semanal' | 'mensal';

    try {
      const filePath = await PdfService.generateHorarioTurma(turmaId, periodo);
      
      res.download(filePath, `horario_turma_${turmaId}.pdf`, (err) => {
        if (err) {
          console.error(err);
        }
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error(unlinkErr);
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao gerar PDF' });
    }
  }
}