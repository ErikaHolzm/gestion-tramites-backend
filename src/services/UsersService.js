// Service Users
import Users from '../models/Users.js';
class UsersService {

      async getAllUsers() {
        return await Users.find().select("-password");
      }
  
      async getUserById(id) {
          return await Users.findById(id).select("-password");
    }
  
      async createNewUser(name, surname, email, password, number) {
          const newUser = await Users.create({
              name: name,
              surname: surname,
              email: email,
              password: password,
              number: number
          })
  
          if (!newUser) {
              throw Error("No se ha podido crear el User. Compruebe los datos.")
          }
  
          return await newUser.save();
      }
  
      async updateUserById(userId, name, surname, email, password, number) {
          const updateData = {
              name: name,
              surname: surname,
              email: email,
              password: password,
              number: number
          };
  
          const user = await Users.findByIdAndUpdate({_id: userId}, updateData);
  
          if (!user) {
              throw Error(`No se ha podido actualizar el user con id ${userId}`);
          }
  
          return await Users.findById(userId);
      }
  
      async deleteUserById(userId) {
          const deleted = await Users.findByIdAndDelete(userId);
  
          if (!deleted) {
              throw new Error("El User no existe o ya fue eliminado");
          }
  
          return deleted;
      }
}

export default new UsersService();