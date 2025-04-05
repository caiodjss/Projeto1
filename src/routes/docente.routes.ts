import { Router } from "express";
import { DocenteController } from "../controllers/docente.controller";

const router = Router();

router.get('/', DocenteController.getAll);
router.get('/:id', DocenteController.getById);
router.post('/', DocenteController.create);
router.put('/:id', DocenteController.update);
router.delete('/:id', DocenteController.delete);
router.get('/:id/horarios', DocenteController.getHorarios);

export default router;