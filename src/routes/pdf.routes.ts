import { Router } from 'express';
import { PdfController } from '../controllers/pdf.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get(
  '/turmas/:turmaId/horario',
  authenticate as any,
  authorize(['coordenador', 'professor'])  as any,
  PdfController.generateHorarioTurma
);

export default router;