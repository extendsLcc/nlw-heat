import { Module } from '@nestjs/common';
import { CreateUserService } from './Services/CreateUser.service';
import { FindUserService } from './Services/FindUser.service';
import { UserProfileController } from './Controllers/UserProfile.controller';

@Module({
  imports: [],
  controllers: [UserProfileController],
  providers: [CreateUserService, FindUserService],
  exports: [CreateUserService, FindUserService],
})
export class UserModule {}
