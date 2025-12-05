import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService:JwtService
  ) {}


  async userRegister(registerDto: RegisterDto) {
    let hash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userService.createUser({...registerDto, password:hash});
    const payload = {subject:user._id};
    const token = await this.jwtService.signAsync(payload);
    return {token: token};
  }
}
