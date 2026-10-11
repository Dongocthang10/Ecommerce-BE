import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entites/account.entity.js';
import { Verification } from './entites/verification.entity.js';
import { Session } from './entites/session.entity.js';
import { SessionAuthService } from './session-auth/session-auth.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../user/user.module.js';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Account, Session, Verification]), UserModule],
    providers: [SessionAuthService, AuthService],
    exports: [SessionAuthService],
    controllers: [AuthController]
})
export class AuthModule {}
