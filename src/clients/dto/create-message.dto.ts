import { OmitType } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { MessageDto } from './message.dto';

export class CreateMessageDto extends OmitType(MessageDto, ['id']) {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsDateString()
  @IsNotEmpty()
  sentAt: Date;
}
