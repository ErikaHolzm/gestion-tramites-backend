import express from 'express';
import UsersController from '../controllers/UsersController.js';
import { validateUserUpdate, userExists, userIsAdmin } from '../middlewares/UsersMiddlewares.js';
import { verifyToken } from '../middlewares/AuthMiddlewares.js';

const router = express.Router();

/* -- Users routes -- */
// POST crear usuario
router.get('/profile', verifyToken, UsersController.getUserProfile);
router.put('/profile', verifyToken, validateUserUpdate, UsersController.updateUserProfile);

/* -- Admin routes -- */
// GET todos los usuarios
router.get('/', verifyToken, userIsAdmin, UsersController.getAllUsers);
// DELETE usuario por ID
router.delete('/:id', verifyToken, userIsAdmin, userExists, UsersController.deleteUserById);
// GET usuario por ID
router.get('/:id', verifyToken, userIsAdmin, userExists, UsersController.getUserProfile);
router.put('/:id', verifyToken, userIsAdmin, userExists, validateUserUpdate, UsersController.updateUserProfile);

export default router;
