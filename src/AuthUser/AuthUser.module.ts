import { Module } from '@nestjs/common';
import { AuthUserController } from './AuthUser.controller';

@Module({
  controllers: [AuthUserController],
})
export class AuthUserModule {}
