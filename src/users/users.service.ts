import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();
    
    const { password, ...userWithoutPassword } = user.toObject();
    
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
