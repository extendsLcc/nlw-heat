import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { FindUserService } from '../Services/FindUser.service';
import { JwtAuthGuard } from '../../AuthUser/JwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UserProfileController {
  constructor(protected findUserService: FindUserService) {}

  @Get('/profile')
  async handle(@Request() request) {
    const { user } = request;
    return await this.findUserService.execute(user.id);
  }
}
