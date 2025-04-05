"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurmaController = void 0;
const turma_model_1 = require("../models/turma.model");
class TurmaController {
    static async getAll(req, res) {
        try {
            const turmas = await turma_model_1.TurmaModel.getAll();
            res.json(turmas);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar turmas' });
        }
    }
    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const turma = await turma_model_1.TurmaModel.getById(id);
            if (turma) {
                res.json(turma);
            }
            else {
                res.status(404).json({ message: 'Turma não encontrada' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar turma' });
        }
    }
    static async create(req, res) {
        const turmaData = req.body;
        try {
            const id = await turma_model_1.TurmaModel.create(turmaData);
            res.status(201).json({ id, ...turmaData });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar turma' });
        }
    }
    static async update(req, res) {
        const id = parseInt(req.params.id);
        const turmaData = req.body;
        try {
            const success = await turma_model_1.TurmaModel.update(id, turmaData);
            if (success) {
                res.json({ id, ...turmaData });
            }
            else {
                res.status(404).json({ message: 'Turma não encontrada' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar turma' });
        }
    }
    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const success = await turma_model_1.TurmaModel.delete(id);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Turma não encontrada' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar turma' });
        }
    }
    static async getHorarios(req, res) {
        const turmaId = parseInt(req.params.id);
        try {
            const horarios = await turma_model_1.TurmaModel.getHorariosByTurmaId(turmaId);
            res.json(horarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horários da turma' });
        }
    }
}
exports.TurmaController = TurmaController;
