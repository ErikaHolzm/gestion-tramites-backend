// TODO: Controller Users
import UsersService from '../services/UsersService.js';

class UsersController {

    async getAllUsers() {
        return UsersService.getAllUsers();
    }

    async getUserById(id) {
        try {
            return await UsersService.getUserById(id);
        } catch(error) {
            throw error;
        }
    }

    async createNewUser(data) {
        try {
            const {name, surname, email, password, number} = data;
            return UsersService.createNewUser(name, surname, email, password, number);
        } catch (error) {
            throw error;
        }

    }

    async updateUserById(data) {
        try {
            const {id, name, surname, email, password, number} = data;
            return await UsersService.updateUserById(id, name, surname, email, password, number);
        } catch (error) {
            throw error;
        }
    }

    async deleteUserById(id) {
        try {
            return await UsersService.deleteUserById(id);
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersController();