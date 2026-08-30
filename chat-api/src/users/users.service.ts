import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './entities/user.repository';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserInput: CreateUserInput) {
    const hashedPasswrod = await bcrypt.hash(createUserInput.password, 10);
    return this.usersRepository.create({
      ...createUserInput,
      password: hashedPasswrod,
    });
  }

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ _id: id });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const updateData = {
      ...updateUserInput,
    };

    if (updateUserInput.password) {
      updateData.password = await bcrypt.hash(updateUserInput.password, 10);
    }
    return await this.usersRepository.findOneAndUpdate(
      { _id: id },
      {
        $set: updateData,
      },
    );
  }

  async remove(id: string) {
    return await this.usersRepository.findOneAndDelete({ _id: id });
  }
}
