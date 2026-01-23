// TODO: Controller Status
import StatusService from '../services/StatusService.js';

class StatusController {

    async getAllStatus(req, res) {
        try {
            const status = await StatusService.getAllStatus();
            res.status(200).json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getStatusById(req, res) {
        try {
            const status = await StatusService.getStatusById(req.params.id);
            res.status(200).json(status);
        } catch(error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createNewStatus(req, res) {
        try {
            const newStatus = await StatusService.createNewStatus(req.body);
            res.status(201).json(newStatus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    async updateStatusById(req, res) {
        try {
            const updatedStatus = await StatusService.updateStatusById(req.params.id, req.body);
            res.json({ message: 'Actualizado', status: updatedStatus });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteStatusById(req, res) {
        try {
            await StatusService.deleteStatusById(req.params.id);
            res.json({ message: 'Eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new StatusController();