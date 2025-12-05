import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
    authService:AuthService;
    constructor(authService:AuthService){
        this.authService = authService;
    }


    @Post("register")
    async register(@Body() registerDto:RegisterDto) {
        let token = await this.authService.userRegister(registerDto);
        return token;
    }
    
}
