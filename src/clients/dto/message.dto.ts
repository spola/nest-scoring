import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
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
    example: 'hola, quiero comprar un dpto',
    required: true,
    description: 'Mensaje enviado',
  })
  text: string;

  @ApiProperty({
    example: 'agent',
    required: true,
    description: 'agent o client',
  })
  role: string;

  @ApiProperty({
    example: '2023-12-24T00:00:00.000Z',
    required: true,
    description: 'Fecha de envío del mensaje',
    type: Date,
  })
  sentAt: Date;
}
