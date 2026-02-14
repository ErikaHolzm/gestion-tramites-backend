import express from 'express';
import RemindersController from '../controllers/RemindersController.js'
import { validateRemindersCreation, validateReminderUpdate, reminderExists } from '../middlewares/RemindersMiddlewares.js'
import { verifyToken } from '../middlewares/AuthMiddlewares.js';

const router = express.Router();

// GET todos los recordatorios
router.get('/', verifyToken, RemindersController.getAllReminders);

// POST crear recordatorio
router.post('/', verifyToken, validateRemindersCreation, RemindersController.createNewReminder);

// GET recordatorio por ID
router.get('/:id', verifyToken, reminderExists, RemindersController.getReminder);

// PUT actualizar recordatorio por ID
router.put('/:id', verifyToken, reminderExists, validateReminderUpdate, RemindersController.updateReminderById);

// DELETE recordatorio por ID
router.delete('/:id', verifyToken, RemindersController.deleteReminderById);

export default router;