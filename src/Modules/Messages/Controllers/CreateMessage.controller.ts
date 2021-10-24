import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateMessageService } from '../Services/CreateMessage.service';
import { JwtAuthGuard } from '../../AuthUser/JwtAuth.guard';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  text: string;
}

@UseGuards(JwtAuthGuard)
@Controller('/messages')
export class CreateMessageController {
  constructor(protected createMessageService: CreateMessageService) {}

  @Post()
  async handle(@Body() createMessageDto: CreateMessageDto, @Request() request) {
    const { text } = createMessageDto;
    const { user } = request;
    return await this.createMessageService.execute(text, user.id);
  }
}
