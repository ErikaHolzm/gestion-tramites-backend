// TODO: Controller Status
import StatusService from '../services/StatusService.js';

class StatusController {

    async getAllStatus() {
        return StatusService.getAllStatus();
    }

    async getStatusById(id) {
        try {
            return await StatusService.getStatusById(id);
        } catch(error) {
            throw error;
        }
    }

    async createNewStatus(data) {
        try {
            const {name, description} = data;
            return StatusService.createNewStatus(name, description);
        } catch (error) {
            throw error;
        }

    }

    async updateStatusById(data) {
        try {
            const {id, name, description} = data;
            return await StatusService.updateStatusById(id, name, description);
        } catch (error) {
            throw error;
        }
    }

    async deleteStatusById(id) {
        try {
            return await StatusService.deleteStatusById(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new StatusController();