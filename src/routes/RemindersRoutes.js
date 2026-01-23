import express from 'express';
import RemindersController from '../controllers/RemindersController.js'
import { validateRemindersCreation, validateReminderUpdate, reminderExists } from '../middlewares/RemindersMiddlewares.js'
const router = express.Router();

// GET todos los recordatorios
router.get('/', RemindersController.getAllReminders);

// POST crear recordatorio
router.post('/', validateRemindersCreation, RemindersController.createNewReminder);

// GET recordatorio por ID
router.get('/:id', reminderExists, RemindersController.getReminder);

// PUT actualizar recordatorio por ID
router.put('/:id', reminderExists, validateReminderUpdate, RemindersController.updateReminderById);

// DELETE recordatorio por ID
router.delete('/:id', RemindersController.deleteReminderById);

export default router;