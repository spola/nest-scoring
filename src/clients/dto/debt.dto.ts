import { ApiProperty } from '@nestjs/swagger';

export class DebtDto {
  @ApiProperty({
    example: 1000,
    required: true,
    description: 'Identificador del cliente',
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  id?: number;

  @ApiProperty({
    example: 'Banco de Chile',
    required: true,
    description: 'Intitución donde se tiene la deuda',
  })
  institution: string;

  @ApiProperty({
    example: 1000000,
    required: true,
    type: 'integer',
    format: 'int32',
    description: 'Monto con el que está publicado como moroso',
  })
  amount: number;

  @ApiProperty({
    example: '2023-12-24T00:00:00.000Z',
    required: true,
    description: 'Fecha de pago donde debía pagar',
    type: Date,
  })
  dueDate: Date;
}
