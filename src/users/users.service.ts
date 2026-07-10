import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    const { password, ...userWithoutPassword } = user.toObject();
    void password; // Es para evitar la advertencia de variable no utilizada
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string){
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    void userPassword; // Es para evitar la advertencia de variable no utilizada
    return userWithoutPassword;
  }
}
