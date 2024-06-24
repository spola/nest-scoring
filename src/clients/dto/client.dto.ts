import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({
    example: '1000',
    required: true,
    description: 'Identificador del cliente',
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  id?: number;

  @ApiProperty({
    example: 'Alexis Vidal',
    required: true,
    description: 'Nombre del cliente',
  })
  name: string;

  @ApiProperty({
    example: '11.111.111-1',
    required: true,
    description: 'Rut del cliente',
  })
  rut: string;

  @ApiProperty({
    example: 'Salario',
    required: true,
    description: 'Salario del cliente',
  })
  salary: number;

  @ApiProperty({
    example: 'Ahorros',
    required: true,
    description: 'Ahorros del cliente',
  })
  savings: number;
}
