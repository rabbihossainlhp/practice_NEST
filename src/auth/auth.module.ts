import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtconstants } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{name: User.name, schema:UserSchema}]),
    JwtModule.registerAsync({
      global:true,
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService) => ({
        secret:configService.get<string>('jwt_secret'),
        signOptions: {expiresIn:'360s'}
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
