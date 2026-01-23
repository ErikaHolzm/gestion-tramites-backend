// TODO: Controller Users
import UsersService from '../services/UsersService.js';

class UsersController {

    async getAllUsers(req, res) {
        try {
            const users = await UsersService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserProfile(req, res) {
        return res.status(200).json(req.user);
    }

    async createNewUser(req, res) {
        try {
            const createdUser = await UsersService.createNewUser(req.body);
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }

    async updateUserById(req, res) {
        try {
            // El ID viene de params, los datos del body
            const updatedUser = await UsersService.updateUserById(req.params.id, req.body);
            res.json({ message: 'Actualizado', user: updatedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteUserById(req, res) {
        try {
            await UsersService.deleteUserById(req.params.id);
            res.json({ message: 'Eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UsersController();