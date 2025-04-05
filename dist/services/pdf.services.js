"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const horario_model_1 = require("../models/horario.model");
class PdfService {
    static async generateHorarioTurma(turmaId, periodo) {
        const horarios = await horario_model_1.HorarioModel.getByTurmaId(turmaId);
        const turma = await horario_model_1.HorarioModel.getTurmaById(turmaId);
        const doc = new pdfkit_1.default();
        const filePath = `./temp/horario_${turmaId}_${Date.now()}.pdf`;
        doc.pipe(fs_1.default.createWriteStream(filePath));
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
        return new Promise((resolve, reject) => {
            doc.on('finish', () => resolve(filePath));
            doc.on('error', reject);
        });
    }
}
exports.PdfService = PdfService;
