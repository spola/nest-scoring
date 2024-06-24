import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateDebtDto {
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
