"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docente_controller_1 = require("../controllers/docente.controller");
const router = (0, express_1.Router)();
router.get('/', docente_controller_1.DocenteController.getAll);
router.get('/:id', docente_controller_1.DocenteController.getById);
router.post('/', docente_controller_1.DocenteController.create);
router.put('/:id', docente_controller_1.DocenteController.update);
router.delete('/:id', docente_controller_1.DocenteController.delete);
router.get('/:id/horarios', docente_controller_1.DocenteController.getHorarios);
exports.default = router;
