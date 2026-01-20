import express from 'express';
import UsersController from '../controllers/UsersController.js';
import { validateUserCreation, validateUserUpdate, userExists } from '../middlewares/UsersMiddlewares.js';

const router = express.Router();

// GET todos los usuarios
router.get('/', async (req, res) => {
    try {
        const allUsers = await UsersController.getAllUsers();
        res.json({ response: allUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST crear usuario
router.post('/', validateUserCreation, async (req, res) => {
    try {
        const newUser = await UsersController.createNewUser(req.body);
        res.status(201).json({ response: `Usuario creado con nombre: ${newUser.name}` });
    } catch (error) {
        console.error(`Error al crear usuario: ${error.message}`);
        res.status(409).json({ error: error.message });
    }
});

// GET usuario por ID
router.get('/:id', userExists, async (req, res) => {
    try {
        res.json({ response: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT actualizar usuario por ID
router.put('/:id', userExists, validateUserUpdate, async (req, res) => {
    try {
        const updatedUser = await UsersController.updateUserById({
            id: req.params.id,
            ...req.body
        });
        res.json({ response: 'Usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        res.status(409).json({ error: error.message });
    }
});

// DELETE usuario por ID
router.delete('/:id', userExists, async (req, res) => {
    try {
        const deleted = await UsersController.deleteUserById(req.params.id);
        res.json({ response: 'Usuario eliminado correctamente', deleted });
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;
