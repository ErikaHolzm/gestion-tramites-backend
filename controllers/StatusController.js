// TODO: Controller Status
import StatusService from '../services/StatusService.js';

class StatusController {

    async getAllStatus() {
        return StatusService.getAllStatus();
    }

    async getStatusById(data) {
        return StatusService.getStatusById(data.id);
    }

    async createNewStatus(data) {
        const {name, description} = data;
        return StatusService.createNewStatus(name, description);
    }

    async updateStatusById(data) {
        return null;
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