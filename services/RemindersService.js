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

  async createNewReminder(title, description, date, status, user) {

    if (!title || !description || !date || !status || !user) {
      throw new Error("title, description, date, status y user son obligatorios");
    }

    const created = await Reminders.create({
      title: title.trim(),
      description: description.trim(),
      date,
      status,
      user,
    });

    return await this.getById(created._id);
  }

  async updateReminderById(id, title, description, date) {

    if (typeof title === "string") title = title.trim();
    if (typeof description === "string") description = description.trim();

    const updated = await Reminders.findByIdAndUpdate(id, { title, description, date }, { new: false })
      .populate("status")
      .populate("user", "-password");

    if (!updated) throw new Error("Reminders no encontrado");
    return updated;
  }

  async delete(id) {
    const deleted = await Reminders.findByIdAndDelete(id);
    if (!deleted) throw new Error("Reminders no encontrado");
    return deleted;
  }

  async deleteReminderById(id) {
      const deleted = await Reminders.findByIdAndDelete(id);

      if (!deleted) {
          throw new Error("El Reminder no existe o ya fue eliminado");
      }

      return deleted;
  }

}

export default new RemindersService();