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

    async createNewStatus(statusData) {
        const newStatus = await Status.create(statusData)

        if (!newStatus) throw Error("No se ha podido crear el Status. Compruebe los datos.")

        return await newStatus.save();
    }

    async updateStatusById(statusId, statusData) {
        const status = await Status.findByIdAndUpdate(
            statusId,
            { $set: statusData},
            { new: true, runValidators: true }
        );

        if (!status) throw Error(`No se ha podido actualizar el status con id ${statusId}`);
        return status;
    }

    async deleteStatusById(statusId) {
        const deleted = await Status.deleteOne({ _id: statusId });

        if (!deleted) throw new Error("El Status no existe o ya fue eliminado");

        return deleted;
    }
    
}

export default new StatusService();