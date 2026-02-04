import usersService from '../services/UsersService.js';

class AuthController {

    async login(req, res) {
        try {
            const token = await usersService.loginUser(req.body);
            res.header('auth-token', token).send(token);
        } catch(error) {
            res.status(401).json({ error: error.message });
        }
    }

    async register(req, res) {
        try {
            const newUser = await usersService.registerUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(409).json({ error: error.message });
        }
    }

}

export default new AuthController();