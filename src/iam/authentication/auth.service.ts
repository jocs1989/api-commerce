import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HashingService } from './hashing/hashing.service';
import { Payload } from '../interface/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email: username });
    if (!user) {
      return null;
    }
    if (!user.isActive) {
      return null;
    }
    const isValid = await this.hashingService.compare(pass, user.password);
    if (!isValid) {
      return null;
    }
    if (user && isValid) {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,

        ...result
      } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log(user);
    const payload = {
      email: user.email,
      sub: user.id,
      rol: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
