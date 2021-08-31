import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await this.hasPassword(password, salt);
    user.accessToken = '';
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username is already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid Credential!');
    }

    const validPassword = await this.isPasswordValid(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid Credential!');
    }

    return username;
  }

  async getUserInfo(username: string): Promise<User> {
    const user = await this.findOne({ username });
    delete user.password;
    return user;
  }

  private hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private isPasswordValid(
    password: string,
    dbpassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, dbpassword);
  }
}
