import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt.payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async singUp(authCreateDto: AuthCredentialDto): Promise<void> {
    return await this.userRepository.signUp(authCreateDto);
  }

  async signIn(authCreateDto: AuthCredentialDto): Promise<object> {
    const username = await this.userRepository.signIn(authCreateDto);
    const payload: jwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
