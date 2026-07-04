import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reminder, ReminderDocument } from './schemas/reminder.schema';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(@InjectModel(Reminder.name) private reminderModel: Model<ReminderDocument>) {}

  async create(createReminderDto: CreateReminderDto, userId: string) {
    const reminder = new this.reminderModel({
      ...createReminderDto,
      user: new Types.ObjectId(userId),
    });
    return reminder.save();
  }

  async findAll(user: any) {
    if (user.role === 'admin') {
      return this.reminderModel.find().exec();
    }
    return this.reminderModel.find({ user: user._id }).exec();
  }

  async findOne(id: string, user: any) {
    const reminder = await this.reminderModel.findById(id).exec();
    
    if (!reminder) {
      return null;
    }

    if (user.role !== 'admin' && reminder.user.toString() !== user._id.toString()) {
      throw new ForbiddenException('No tienes permisos para acceder a este reminder');
    }

    return reminder;
  }

  async update(id: string, updateReminderDto: UpdateReminderDto, user: any) {
    const reminder = await this.reminderModel.findById(id).exec();
    
    if (!reminder) {
      return null;
    }

    if (user.role !== 'admin' && reminder.user.toString() !== user._id.toString()) {
      throw new ForbiddenException('No tienes permisos para modificar este reminder');
    }

    return this.reminderModel.findByIdAndUpdate(id, updateReminderDto, { new: true }).exec();
  }

  async remove(id: string, user: any) {
    const reminder = await this.reminderModel.findById(id).exec();
    
    if (!reminder) {
      return null;
    }

    if (user.role !== 'admin' && reminder.user.toString() !== user._id.toString()) {
      throw new ForbiddenException('No tienes permisos para eliminar este reminder');
    }

    return this.reminderModel.findByIdAndDelete(id).exec();
  }
}
