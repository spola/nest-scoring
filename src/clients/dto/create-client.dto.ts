import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMessageDto } from './create-message.dto';
import { Type } from 'class-transformer';
import { CreateDebtDto } from './create-debt.dto';
import { ClientDto } from './client.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { DebtDto } from './debt.dto';
import { MessageDto } from './message.dto';

// The Api definition is extended from ClientDto
export class CreateClientDto extends OmitType(ClientDto, ['id']) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  salary: number;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  savings: number;

  @ApiProperty({
    isArray: true,
    type: CreateMessageDto,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMessageDto)
  messages: CreateMessageDto[];

  @ApiProperty({
    isArray: true,
    type: CreateDebtDto,
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDebtDto)
  debts: CreateDebtDto[];
}

/*
  @ApiProperty({
    required: false,
    description: 'Deudas registradas por el cliente',
    isArray: true,
    type: OmitType(DebtDto, ['id']),
  })

*/
