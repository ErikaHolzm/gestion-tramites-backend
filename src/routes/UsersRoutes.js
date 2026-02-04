import express from 'express';
import UsersController from '../controllers/UsersController.js';
import { validateUserCreation, validateUserUpdate, userExists } from '../middlewares/UsersMiddlewares.js';
import { verifyToken } from '../middlewares/AuthMiddlewares.js';

const router = express.Router();

// GET todos los usuarios
router.get('/', verifyToken, UsersController.getAllUsers);

// POST crear usuario
router.post('/', validateUserCreation, UsersController.createNewUser);

// GET usuario por ID
router.get('/:id', userExists, UsersController.getUserProfile);

// PUT actualizar usuario por ID
router.put('/:id', verifyToken, userExists, validateUserUpdate, UsersController.updateUserById);

// DELETE usuario por ID
router.delete('/:id', verifyToken, userExists, UsersController.deleteUserById);

export default router;
