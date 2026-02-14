// Service Users
import Users from '../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

class UsersService {

    async getAllUsers() {
        return await Users.find().select("-password");
    }

    async getUserById(id) {
        return await Users.findById(id).select("-password");
    }
  
    async updateUserById(userId, updateData) {
        const user = await Users.findByIdAndUpdate(
            userId, 
            { $set: updateData }, 
            { new: true, runValidators: true } // new: true devuelve el usuario ya actualizado
        ).select("-password");

        if (!user) throw new Error("No se pudo actualizar el usuario");
        return user;
    }

    async deleteUserById(userId) {
        const deleted = await Users.deleteOne({ _id: userId });

        if (!deleted) throw new Error("El User no existe o ya fue eliminado");

        return deleted;
    }

    async loginUser(loginData) {
        const user = await Users.findOne({ email: loginData.email });

        const isValid = await bcrypt.compare(loginData.password, user.password);

        if (!user || !isValid) throw new Error("Credenciales inválidas");

        return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    async registerUser(userData) {
        // Encriptar la contraseña antes de guardar
        userData.password = await bcrypt.hash(userData.password, 10);

        // Verificar si el email o number ya está registrado
        const existingUser = await Users.findOne({ 
            $or: [
                { email: userData.email },
                { number: userData.number }
            ] 
        });

        if (existingUser) {
            throw new Error("El email o número ya está registrado");
        }

        const userDoc = await Users.create(userData);

        if (!userDoc) throw new Error("No se ha podido crear el usuario.");

        // Buscamos el ID recién creado excluyendo el password explícitamente
        const newUser = await Users.findById(userDoc._id).select('-password');

        return newUser;
    }

    async isAdmin(userId) {
        if (!userId) return false;
        
        const user = await Users.findById(userId);
        return user.role === "admin";
    }
}

export default new UsersService();