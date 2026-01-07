// TODO: Service Users
class UsersService {
  async getAll() {
    return await User.find().select("-password");
  }

  async create(data) {
    const { name, surname, email, password, number } = data;

    if (!name || !surname || !email || !password || !number) {
      throw new Error("Todos los campos son obligatorios");
    }

    return await User.create({ name, surname, email, password, number });
  }
}

export default new UsersService();