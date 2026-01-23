import express from 'express';
import StatusController from '../controllers/StatusController.js'
import { validateStatus } from '../middlewares/StatusMiddlewares.js';
import { validateRequired } from '../middlewares/ValidateBody.js';

const router = express.Router();

// Obtención de todos los status
router.get('/', StatusController.getAllStatus);

// Crear nuevo status
router.post('/', validateRequired(["name", "description"]), validateStatus, StatusController.createNewStatus);

// Obtener un Status por ID
router.get('/:id', StatusController.getStatusById);

// Actualizar Status por ID
router.put('/:id', validateStatus, StatusController.updateStatusById);

// Borrar un Status por ID
router.delete('/:id', StatusController.deleteStatusById);

export default router;
