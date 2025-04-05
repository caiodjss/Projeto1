"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordenadorController = void 0;
const coordenador_model_1 = require("../models/coordenador.model");
class CoordenadorController {
    static async getAll(req, res) {
        try {
            const coordenadores = await coordenador_model_1.CoordenadorModel.getAll();
            res.json(coordenadores);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar coordenadores' });
        }
    }
    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const coordenador = await coordenador_model_1.CoordenadorModel.getById(id);
            if (coordenador) {
                res.json(coordenador);
            }
            else {
                res.status(404).json({ message: 'Coordenador não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar coordenador' });
        }
    }
    static async create(req, res) {
        const coordenadorData = req.body;
        try {
            const id = await coordenador_model_1.CoordenadorModel.create(coordenadorData);
            res.status(201).json({ id, ...coordenadorData });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar coordenador' });
        }
    }
    static async update(req, res) {
        const id = parseInt(req.params.id);
        const coordenadorData = req.body;
        try {
            const success = await coordenador_model_1.CoordenadorModel.update(id, coordenadorData);
            if (success) {
                res.json({ id, ...coordenadorData });
            }
            else {
                res.status(404).json({ message: 'Coordenador não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar coordenador' });
        }
    }
    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const success = await coordenador_model_1.CoordenadorModel.delete(id);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Coordenador não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar coordenador' });
        }
    }
}
exports.CoordenadorController = CoordenadorController;
