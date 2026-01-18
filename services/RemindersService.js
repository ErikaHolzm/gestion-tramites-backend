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

  async create(data) {
    const { title, description, date, status, user } = data;

    if (!title || !description || !date || !status || !user) {
      throw new Error("title, description, date, status y user son obligatorios");
    }

    console.log('AQUI LLEGA');
    const created = await Reminders.create({
      title: title.trim(),
      description: description.trim(),
      date,
      status,
      user,
    });

    return await this.getById(created._id);
  }

  async update(id, data) {
   
    if (typeof data.title === "string") data.title = data.title.trim();
    if (typeof data.description === "string") data.description = data.description.trim();

    const updated = await Reminders.findByIdAndUpdate(id, data, { new: true })
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
}

export default new RemindersService();