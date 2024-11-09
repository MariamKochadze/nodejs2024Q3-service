import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  private users: User[] = []; 

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = { id: Date.now().toString(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<User> {
    const user = await this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = updatePasswordDto.newPassword;
    return user;
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
