import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: (String(process.env.JWT_EXPIRES) || '60s') as any }
    })

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
