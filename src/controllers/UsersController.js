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
        try {
            const userId = req.params.id || req.user.id;
            const user = await UsersService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener el perfil" });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const userId = req.params.id || req.user.id;
            const updatedUser = await UsersService.updateUserById(userId, req.body);
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