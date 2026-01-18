import express from 'express';
import StatusController from '../controllers/StatusController.js'
const router = express.Router();

// Obtención de todos los status
router.get('/', async (req, res) => {
    const allStatus = await StatusController.getAllStatus();
    res.json({response: allStatus});
});

// Crear nuevo status
router.post('/', async (req, res) => {
  try {
    const newStatus = await StatusController.createNewStatus(req.body);  
    res.json({response: `Status creado con name: ${newStatus.name}`});
  } catch (error) {
    console.error(`No se ha podido crear el status con data: ${JSON.stringify(req.body)}`);
    res.status(409).json({ error: error.message });
  }
});

// Obtener un Status por ID
router.get('/:id', async (req, res) => {
  try {
    const status = await StatusController.getStatusById(req.params.id);
    res.json({response: status});
  } catch (error) {
    console.error('El status no existe');
    res.status(404).json({ error: error.message });
  }
});


// Actualizar Status por ID
router.put('/', async (req, res) => {
  try {
    const status = await StatusController.updateStatusById(req.body);
    res.json({ response: 'Status actualizado correctamente', status });
  } catch (error) {
    console.error('No se ha podido actualizar el status');
    res.status(409).json({ error: error.message });
  }
});

// Borrar un Status por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await StatusController.deleteStatusById(req.params.id);
    res.json({ response: 'Status eliminado correctamente', deleted });
  } catch (error) {
    console.error('No se ha podido eliminar el status');
    res.status(404).json({ error: error.message });
  }
});

export default router;
