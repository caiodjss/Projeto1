"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocenteController = void 0;
const docente_model_1 = require("../models/docente.model");
/**
 * @swagger
 * tags:
 *   name: Docentes
 *   description: Gerenciamento de docentes
 */
class DocenteController {
    /**
     * @swagger
     * /api/docentes:
     *   get:
     *     summary: Retorna todos os docentes
     *     tags: [Docentes]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de docentes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Docente'
     */
    static async getAll(req, res) {
        try {
            const docentes = await docente_model_1.DocenteModel.getAll();
            res.status(200).json(docentes);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar docentes' });
        }
    }
    /**
     * @swagger
     * /api/docentes/{id}:
     *   get:
     *     summary: Obtém um docente pelo ID
     *     tags: [Docentes]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID do docente
     *     responses:
     *       200:
     *         description: Dados do docente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Docente'
     *       404:
     *         description: Docente não encontrado
     */
    static async getById(req, res) {
        const id = parseInt(req.params.id);
        try {
            const docente = await docente_model_1.DocenteModel.getById(id);
            if (docente) {
                res.json(docente);
            }
            else {
                res.status(404).json({ message: 'Docente não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar docente' });
        }
    }
    static async create(req, res) {
        const docenteData = req.body;
        try {
            const id = await docente_model_1.DocenteModel.create(docenteData);
            res.status(201).json({ id, ...docenteData });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar docente' });
        }
    }
    static async update(req, res) {
        const id = parseInt(req.params.id);
        const docenteData = req.body;
        try {
            const success = await docente_model_1.DocenteModel.update(id, docenteData);
            if (success) {
                res.json({ id, ...docenteData });
            }
            else {
                res.status(404).json({ message: 'Docente não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar docente' });
        }
    }
    static async delete(req, res) {
        const id = parseInt(req.params.id);
        try {
            const success = await docente_model_1.DocenteModel.delete(id);
            if (success) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: 'Docente não encontrado' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar docente' });
        }
    }
    static async getHorarios(req, res) {
        const docenteId = parseInt(req.params.id);
        try {
            const horarios = await docente_model_1.DocenteModel.getHorariosByDocenteId(docenteId);
            res.json(horarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar horários do docente' });
        }
    }
}
exports.DocenteController = DocenteController;
