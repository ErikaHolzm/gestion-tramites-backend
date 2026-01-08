// TODO: Service Status
import Status from '../models/Status.js';

class StatusService {

    async getAllStatus() {
        return await Status.find().sort({name: 1});
    }

    async getStatusById(id) {
        const status = await Status.findById(id);

        if (!status) {
            throw new Error(`El Status con id ${id} no existe`);
        }

        return status;
    }

    async createNewStatus(name, description) {
        const newStatus = await Status.create({
            name: name,
            description: description
        })

        if (!newStatus) {
            throw Error("No se ha podido crear el Status. Compruebe los datos.")
        }

        return await newStatus.save();
    }

    async updateStatusById(statusId, name, description) {
        const updateData = {name: name, description: description};

        const status = await Status.findByIdAndUpdate({_id: statusId}, updateData);

        if (!status) {
            throw Error(`No se ha podido actualizar el status con id ${statusId}`);
        }

        return await Status.findById(statusId);
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