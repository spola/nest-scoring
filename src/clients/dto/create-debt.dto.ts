import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { DebtDto } from './debt.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateDebtDto extends OmitType(DebtDto, ['id']) {
  @IsString()
  @IsNotEmpty()
  institution: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;
}
