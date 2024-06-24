import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';
import { Type } from 'class-transformer';
import { CreateDebtDto } from './create-debt.dto';

export class CreateClientDto {
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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMessageDto)
  messages: CreateMessageDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateDebtDto)
  debts: CreateDebtDto[];
}
