import { GetLast3MessagesService } from '../Services/GetLast3Messages.service';
import { Controller, Get } from '@nestjs/common';

@Controller('/messages')
export class GetLast3MessagesController {
  constructor(protected getLast3MessagesService: GetLast3MessagesService) {}

  @Get('/last3')
  async handle() {
    return await this.getLast3MessagesService.execute();
  }
}
