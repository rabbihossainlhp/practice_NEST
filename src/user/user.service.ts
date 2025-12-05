import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,){}
    async createUser(registerDto: RegisterDto) {
        
        try{
          return await this.userModel.create({
            firstName: registerDto.firstName,
            lastname: registerDto.lastName,
            email: registerDto.email,
            password: registerDto.password 
        })
        }catch(err){
            const duplicate_error_key_code = 11000;
            if(err.code == duplicate_error_key_code){
                throw new ConflictException("Email has already taken");
            }
            throw err;
        }
        
    }
}
