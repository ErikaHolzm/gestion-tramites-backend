import RemindersService from '../services/RemindersService.js';

class RemindersController {

    // Obtener todos los reminders (solo admin)
    async getAllReminders(req, res) {
        try {
            const reminders = await RemindersService.getAll();
            res.status(200).json(reminders);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getMyReminders(req, res) {
        try {
            const reminders = await RemindersService.getMyReminders(req.user.id);
            res.status(200).json(reminders);
        } catch(error) {
            res.status(404).json({ error: error.message });
        }    
    }

    async getReminder(req, res) {
        try {
            const reminder = await RemindersService.getById(req.params.id, req.user.id);
            res.status(200).json(reminder);
        } catch(error) {
            res.status(404).json({ error: error.message });
        }
    }

    async createNewReminder(req, res) {
        try {
            const createdReminder = await RemindersService.createNewReminder(req.body, req.user.id);
            res.status(201).json(createdReminder);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    }

    async updateReminderById(req, res) {
        try {
            const updatedReminder = await RemindersService.updateReminderById(req.params.id, req.body);
            res.status(201).json(updatedReminder);
        } catch (error) {
            res.status(400).json({ error: error.message});
        }
    }

    async deleteReminderById(req, res) {
        try {
            await RemindersService.deleteReminderById(req.params.id, req.user.id);
            res.json({ message: 'Eliminado correctamente'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new RemindersController();