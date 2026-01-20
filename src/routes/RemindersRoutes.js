import express from 'express';
import RemindersController from '../controllers/RemindersController.js'
const router = express.Router();

router.get("/", async (req, res) => {
  const allReminders = await RemindersController.getAllReminders();
  res.json({ response: allReminders });
});


router.post("/", async (req, res) => {
  try {
    const newReminder = await RemindersController.createNewReminder(req.body);
    res.json({ response: `Reminder creado con title: ${newReminder.title}` });
  } catch (error) {
    console.error(
      `No se ha podido crear el reminder con data: ${JSON.stringify(req.body)}`
    );
    res.status(409).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const reminder = await RemindersController.getReminderById(req.params.id);
    res.json({ response: reminder });
  } catch (error) {
    console.error("El reminder no existe");
    res.status(404).json({ error: error.message });
  }
});


router.put("/", async (req, res) => {
  try {
    const reminder = await RemindersController.updateReminderById(req.body);
    res.json({ response: "Reminder actualizado correctamente", reminder });
  } catch (error) {
    console.error("No se ha podido actualizar el reminder");
    res.status(409).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await RemindersController.deleteReminderById(req.params.id);
    res.json({ response: "Reminder eliminado correctamente", deleted });
  } catch (error) {
    console.error("No se ha podido eliminar el reminder");
    res.status(404).json({ error: error.message });
  }
});

export default router;