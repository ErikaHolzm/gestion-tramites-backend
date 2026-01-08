import express from 'express';
import StatusController from '../controllers/StatusController.js'
const router = express.Router();

router.get('/', async (req, res) => {
    const allStatus = await StatusController.getAllStatus();
    res.json({response: allStatus});
});

router.post('/', async (req, res) => {
    const newStatus = await StatusController.createNewStatus(req.body);  
    res.json({response: `Status creado con name: ${newStatus.name}`});
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await StatusController.deleteStatusById(req.params.id);
    res.json({ response: 'Status eliminado correctamente', deleted });
  } catch (error) {
    console.log('No se ha podido eliminar el status');
    res.status(404).json({ error: error.message });
  }
});

export default router;
