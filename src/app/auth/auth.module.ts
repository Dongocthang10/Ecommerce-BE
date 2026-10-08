import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entites/account.entity.js';
import { Verification } from './entites/verification.entity.js';
import { Session } from './entites/session.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([Account, Session, Verification])]
})
export class AuthModule {}
