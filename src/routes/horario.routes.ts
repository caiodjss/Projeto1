import { Router } from 'express';
import { HorarioController } from '../controllers/horario.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate as any);

router.get('/', HorarioController.getAll);
router.get('/:id', HorarioController.getById);
router.get('/docente/:docenteId', HorarioController.getByDocente);
router.get('/turma/:turmaId', HorarioController.getByTurma);
router.post('/', authorize(['coordenador']) as any, HorarioController.create);
router.put('/:id', authorize(['coordenador']) as any, HorarioController.update);
router.delete('/:id', authorize(['coordenador']) as any, HorarioController.delete);

export default router;