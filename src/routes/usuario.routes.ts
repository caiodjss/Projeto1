import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UsuarioController } from "../controllers/usuario.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { body, validationResult } from 'express-validator';



const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.use(authenticate as any);

router.get('/', authorize(['coordenador']) as any, UsuarioController.getAll);
router.get('/:id', authorize(['coordenador']) as any, UsuarioController.getById);
router.post('/', authorize(['coordenador']) as any, UsuarioController.create);
router.put('/:id', authorize(['coordenador']) as any, UsuarioController.update);
router.delete('/:id', authorize(['coordenador']) as any, UsuarioController.delete);

router.get('/me', UsuarioController.getCurrentUser);
router.put('/me/update-password', UsuarioController.updatePassword as any);

export default router;
