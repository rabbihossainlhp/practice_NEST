import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { LoginDto } from './dto/loginUser.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    authService:AuthService;
    userService:UserService;
    constructor(authService:AuthService, userService:UserService){
        this.authService = authService;
        this.userService = userService;
    }


    @Post("register")
    async register(@Body() registerDto:RegisterDto) {
        let token = await this.authService.userRegister(registerDto);
        return token;
    }



    @Post('login')
    async login(@Body() loginDto: LoginDto){
        let token = await this.authService.userLogin(loginDto);
        return token;
    }
    

    @UseGuards( AuthGuard )
    @Get('profile')
    async getProfile (@Request() req){
        const userId = req.user.subject;
        const  user =  await this.userService.getUserById(userId);
        return user;
    }
    
}
