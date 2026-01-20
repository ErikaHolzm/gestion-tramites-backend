// Service Users
import Users from '../models/Users.js';
class UsersService {

      async getAllUsers() {
        return await Users.find().select("-password");
      }
  
      async getUserById(id) {
          return await Users.findById(id).select("-password");
    }
  
    async createNewUser(userData) {
        const newUser = await Users.create(userData);

        if (!newUser) throw Error("No se ha podido crear el User. Compruebe los datos.")

        return await newUser.save();
    }
  
    async updateUserById(userId, updateData) {
        const user = await Users.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true, runValidators: true } // new: true devuelve el usuario ya actualizado
        ).select("-password");

        if (!user) throw new Error("No se pudo actualizar");
        return user;
    }

      async deleteUserById(userId) {
        const deleted = await Users.deleteOne({ _id: userId });
  
          if (!deleted) {
              throw new Error("El User no existe o ya fue eliminado");
          }
  
          return deleted;
      }
}

export default new UsersService();