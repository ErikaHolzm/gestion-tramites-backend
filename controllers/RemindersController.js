import RemindersService from '../services/RemindersService.js';

class RemindersController {

    async getAllReminders() {
        return await RemindersService.getAll();
    }

    async getReminderById(id) {
        try {
            return await RemindersService.getById(id);
        } catch (error) {
            throw error;
        }
    }

    async createNewReminder(data) {
        try {
            const {title, description, date, status, user} = data;
            // TODO: Validar status y user existen
            return await RemindersService.createNewReminder(title, description, date, status, user);
        } catch (error) {
            throw error;
        }
    }

    async updateReminderById(data) {
        try {
            const {id, title, description, date} = data;
            return await RemindersService.updateReminderById(id, title, description, date);
        } catch (error) {
            throw error;
        }
    }

    async deleteReminderById(id) {
        try {
            return await RemindersService.deleteReminderById(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new RemindersController();