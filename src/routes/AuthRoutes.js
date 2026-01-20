import express from 'express';
import AuthController from '../controllers/AuthController.js'
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await AuthController.registerUser(req.body);
    res.json({ response: `Usuario creado con email: ${newUser.email}` });
  } catch (error) {
    console.error(
      `No se ha podido crear el usuario con data: ${JSON.stringify(req.body)}`
    );
    res.status(409).json({ error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const user = await AuthController.loginUser(req.body);
    res.json({ response: `Usuario logueado con email: ${user.email}` });
  } catch (error) {
    console.error(
      `No se ha podido loguear el usuario con data: ${JSON.stringify(req.body)}`
    );
    res.status(409).json({ error: error.message });
  }
});
