import { Router } from 'express';
import { CoordenadorController } from '../controllers/coordenador.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate as any);

router.get('/', CoordenadorController.getAll);
router.get('/:id', CoordenadorController.getById);

router.post('/', authorize(['coordenador']) as any, CoordenadorController.create);
router.put('/:id', authorize(['coordenador']) as any, CoordenadorController.update);
router.delete('/:id', authorize(['coordenador']) as any, CoordenadorController.delete);

export default router;