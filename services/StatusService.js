// TODO: Service Status
import Status from '../models/Status.js';

class StatusService {

    async getAllStatus() {
        return await Status.find().sort({name: 1});
    }

    async getStatusById(id) {
        return await Status.findById(id);
    }

    async createNewStatus(name, description) {
        const newStatus = await Status.create({
            name: name,
            description: description
        })

        return await newStatus.save();
    }

    async updateStatusById(statusId, name, description) {

    }

    async deleteStatusById(statusId) {
        const deleted = await Status.findByIdAndDelete(statusId);

        if (!deleted) {
            throw new Error("El Status no existe o ya fue eliminado");
        }

        return deleted;
    }
    
}

export default new StatusService();