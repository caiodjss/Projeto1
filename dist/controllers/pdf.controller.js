"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const fs_1 = __importDefault(require("fs"));
const pdf_services_1 = require("../services/pdf.services");
class PdfController {
    static async generateHorarioTurma(req, res) {
        const turmaId = parseInt(req.params.turmaId);
        const periodo = req.query.periodo;
        try {
            const filePath = await pdf_services_1.PdfService.generateHorarioTurma(turmaId, periodo);
            res.download(filePath, `horario_turma_${turmaId}.pdf`, (err) => {
                if (err) {
                    console.error(err);
                }
                fs_1.default.unlink(filePath, (unlinkErr) => {
                    if (unlinkErr)
                        console.error(unlinkErr);
                });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao gerar PDF' });
        }
    }
}
exports.PdfController = PdfController;
