import express from 'express';
import AuthController from '../controllers/AuthController.js'
import { validateAuthData, validateLoginData } from '../middlewares/AuthMiddlewares.js';

const router = express.Router();

router.post('/register', validateAuthData, AuthController.register);

router.post('/login', validateLoginData, AuthController.login);

export default router;