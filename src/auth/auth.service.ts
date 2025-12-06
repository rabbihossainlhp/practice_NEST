import { BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService:JwtService,
    @InjectModel(User.name ) private userModle: Model<User>,
  ) {}


  async userRegister(registerDto: RegisterDto) {
    let hash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userService.createUser({...registerDto, password:hash});
    const payload = {subject:user._id};
    const token = await this.jwtService.signAsync(payload);
    return {token: token};
  }



  async userLogin(loginDto: LoginDto){
      let isUserExist = await this.userModle.findOne({email:loginDto.email});
      
      if(!isUserExist){
        throw new NotFoundException("User not found")
      }

      let passMatch = await bcrypt.compare(loginDto.password, isUserExist.password);
      if(!passMatch){
        throw new BadRequestException("creadential may not matching...")
      }

      let payload = {subject:isUserExist._id}
      const token = await this.jwtService.signAsync(payload);
      return {token:token};

  }
}
