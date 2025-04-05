"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioController = void 0;
const horario_model_1 = require("../models/horario.model");
class HorarioController {
    static async getAll(req, res) {
        try {
            const horarios = await horario_model_1.HorarioModel.getAll();
            res.json(horarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horários' });
        }
    }
    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const horario = await horario_model_1.HorarioModel.getById(id);
            if (horario) {
                res.json(horario);
            }
            else {
                res.status(404).json({ message: 'Horário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horário' });
        }
    }
    static async create(req, res) {
        const horarioData = req.body;
        try {
            const id = await horario_model_1.HorarioModel.create(horarioData);
            res.status(201).json({ id, ...horarioData });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar horário' });
        }
    }
    static async update(req, res) {
        const id = parseInt(req.params.id);
        const horarioData = req.body;
        try {
            const success = await horario_model_1.HorarioModel.update(id, horarioData);
            if (success) {
                res.json({ id, ...horarioData });
            }
            else {
                res.status(404).json({ message: 'Horário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar horário' });
        }
    }
    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const success = await horario_model_1.HorarioModel.delete(id);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Horário não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar horário' });
        }
    }
    static async getByDocente(req, res) {
        const docenteId = parseInt(req.params.docenteId);
        try {
            const horarios = await horario_model_1.HorarioModel.getByDocenteId(docenteId);
            res.json(horarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horários do docente' });
        }
    }
    static async getByTurma(req, res) {
        const turmaId = parseInt(req.params.turmaId);
        try {
            const horarios = await horario_model_1.HorarioModel.getByTurmaId(turmaId);
            res.json(horarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horários da turma' });
        }
    }
}
exports.HorarioController = HorarioController;
