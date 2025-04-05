"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdf_controller_1 = require("../controllers/pdf.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/turmas/:turmaId/horario', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(['coordenador', 'professor']), pdf_controller_1.PdfController.generateHorarioTurma);
exports.default = router;
