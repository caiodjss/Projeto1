import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { TurmaController } from '../controllers/turma.controller';


const router = Router();

router.use(authenticate as any);

router.get('/', TurmaController.getAll);
router.get('/:id', TurmaController.getById);
router.get('/:id/horarios', TurmaController.getHorarios);
router.post('/', authorize(['coordenador']) as any, TurmaController.create);
router.put('/:id', authorize(['coordenador']) as any, TurmaController.update);
router.delete('/:id', authorize(['coordenador']) as any, TurmaController.delete);

export default router;