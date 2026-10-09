import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entites/account.entity.js';
import { Verification } from './entites/verification.entity.js';
import { Session } from './entites/session.entity.js';
import { SessionAuthService } from './session-auth/session-auth.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Session, Verification])],
    providers: [SessionAuthService],
    exports: [SessionAuthService]
})
export class AuthModule {}
