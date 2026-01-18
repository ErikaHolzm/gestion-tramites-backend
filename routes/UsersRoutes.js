import express from 'express';
import UsersController from '../controllers/UsersController.js'
const router = express.Router();

// Obtención de todos los users
router.get('/', async (req, res) => {
    const allUsers = await UsersController.getAllUsers();
    res.json({response: allUsers});
});

// Crear nuevo users
router.post('/', async (req, res) => {
  try {
    const newUsers = await UsersController.createNewUser(req.body);  
    res.json({response: `Users creado con name: ${newUsers.name}`});
  } catch (error) {
    console.error(`No se ha podido crear el users con data: ${JSON.stringify(req.body)}`);
    res.users(409).json({ error: error.message });
  }

});

// Obtener un Users por ID
router.get('/:id', async (req, res) => {
  try {
    const users = await UsersController.getUserById(req.params.id);
    res.json({response: users});
  } catch (error) {
    console.error('El users no existe');
    res.users(404).json({ error: error.message });
  }
});


// Actualizar Users por ID
router.put('/', async (req, res) => {
  try {
    const users = await UsersController.updateUserById(req.body);
    res.json({ response: 'Users actualizado correctamente', users });
  } catch (error) {
    console.error('No se ha podido actualizar el users');
    res.users(409).json({ error: error.message });
  }
});

// Borrar un Users por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await UsersController.deleteUserById(req.params.id);
    res.json({ response: 'Users eliminado correctamente', deleted });
  } catch (error) {
    console.error('No se ha podido eliminar el users');
    res.users(404).json({ error: error.message });
  }
});

export default router;
