import PDFDocument from 'pdfkit';
import fs from 'fs';
import { HorarioModel } from '../models/horario.model';

export class PdfService {
  static async generateHorarioTurma(turmaId: number, periodo: 'semanal' | 'mensal') {
    const horarios = await HorarioModel.getByTurmaId(turmaId);
    const turma = await HorarioModel.getTurmaById(turmaId);

    const doc = new PDFDocument();
    const filePath = `./temp/horario_${turmaId}_${Date.now()}.pdf`;
    
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text(`Horário da Turma: ${turma.nome}`, { align: 'center' });
    doc.fontSize(16).text(`Curso: ${turma.curso} - Período: ${turma.periodo}`, { align: 'center' });
    doc.moveDown();

    const startX = 50;
    let startY = 150;
    const rowHeight = 30;
    const colWidth = 100;

    doc.font('Helvetica-Bold')
       .fontSize(12)
       .text('Dia', startX, startY)
       .text('Hora Início', startX + colWidth, startY)
       .text('Hora Fim', startX + colWidth * 2, startY)
       .text('Professor', startX + colWidth * 3, startY);

    startY += rowHeight;

    doc.font('Helvetica').fontSize(10);
    for (const horario of horarios) {
      doc.text(horario.dia_semana, startX, startY)
         .text(horario.hora_inicio, startX + colWidth, startY)
         .text(horario.hora_fim, startX + colWidth * 2, startY)
         .text(horario.docente_nome, startX + colWidth * 3, startY);
      startY += rowHeight;
    }

    doc.end();

    return new Promise<string>((resolve, reject) => {
      doc.on('finish', () => resolve(filePath));
      doc.on('error', reject);
    });
  }
}