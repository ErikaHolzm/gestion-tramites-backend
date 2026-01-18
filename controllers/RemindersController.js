import RemindersService from '../services/RemindersService.js';

class RemindersController {

    async getAllReminders(req, res) {
        try {
            const reminders = await RemindersService.getAll();
            res.json(reminders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReminderById(req, res) {
        try {
            const reminder = await RemindersService.getById(req.params.id);
            res.json(reminder);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async createNewReminder(req, res) {
        try {
            const reminder = await RemindersService.create(req.body);
            res.status(201).json(reminder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateReminderById(req, res) {
        try {
            const reminder = await RemindersService.update(req.params.id, req.body);
            res.json(reminder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteReminderById(req, res) {
        try {
            const deleted = await RemindersService.delete(req.params.id);
            res.json({ message: "Reminder eliminado", deleted });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export default new RemindersController();