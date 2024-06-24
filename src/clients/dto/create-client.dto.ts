import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
}
