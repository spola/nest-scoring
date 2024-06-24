import { ApiProperty } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

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
    example: 100000,
    required: true,
    description: 'Salario del cliente',
  })
  salary: number;

  @ApiProperty({
    example: 4000000,
    required: true,
    description: 'Ahorros del cliente',
  })
  savings: number;

  @ApiProperty({
    example: 4000000,
    required: false,
    description: 'Mensajes que se han compartido con el cliente',
    isArray: true,
    type: MessageDto,
  })
  messages: MessageDto[];
}
