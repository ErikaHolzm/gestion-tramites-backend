import express from 'express';
import StatusController from '../controllers/StatusController.js'
import { validateStatus } from '../middlewares/StatusMiddlewares.js';
import { validateRequired } from '../middlewares/ValidateBody.js';
import { verifyToken } from '../middlewares/AuthMiddlewares.js';
import { userIsAdmin } from '../middlewares/UsersMiddlewares.js';

const router = express.Router();

// Obtención de todos los status
router.get('/', verifyToken, StatusController.getAllStatus);

// Crear nuevo status
router.post('/', verifyToken, userIsAdmin, validateRequired(["name", "description"]), validateStatus, StatusController.createNewStatus);

// Obtener un Status por ID
router.get('/:id', verifyToken, StatusController.getStatusById);

// Actualizar Status por ID
router.put('/:id', verifyToken, userIsAdmin, validateStatus, StatusController.updateStatusById);

// Borrar un Status por ID
router.delete('/:id', verifyToken, userIsAdmin, StatusController.deleteStatusById);

export default router;
