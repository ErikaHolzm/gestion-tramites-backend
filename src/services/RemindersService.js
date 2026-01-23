import Reminders from '../models/Reminders.js';

class RemindersService {

  async getAll() {
    return await Reminders.find()
      .populate("status")
      .populate("user", "-password")
      .sort({ date: 1 });
  }

  async getById(id) {
    const reminder = await Reminders.findById(id)
      .populate("status")
      .populate("user", "-password");

    if (!reminder) throw new Error("Reminders no encontrado");
    return reminder;
  }

  async createNewReminder(reminderData) {
    const newReminder = await Reminders.create(reminderData);

    if (!newReminder) throw Error("No se ha podido crear el Recordatorio. Compruebe los datos.")

    return await newReminder.save();
  }

  async updateReminderById(reminderId, reminderData) {
    const reminder = await Reminders.findByIdAndUpdate(
      reminderId, 
      { $set: reminderData},
      { new: true, runValidators: true})
      .populate("status")
      .populate("user", "-password");

    if (!reminder) throw new Error("No se pudo actualizar el recordatorio.");
    return reminder;
  }

  async deleteReminderById(reminderId) {
    const deleted = await Reminders.deleteOne({ _id: reminderId });
    
    if (!deleted) throw new Error("El Recordatorio no existe o ya fue eliminado");
    
    return deleted;
  }
}

export default new RemindersService();