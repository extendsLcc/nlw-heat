import { Module } from '@nestjs/common';
import { CreateUserService } from './Services/CreateUser.service';
import { FindUserService } from './Services/FindUser.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CreateUserService, FindUserService],
  exports: [CreateUserService, FindUserService],
})
export class UserModule {}
