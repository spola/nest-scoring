import { ApiProperty } from '@nestjs/swagger';

export class BadRequestOpenApiExampleDTO {
  @ApiProperty({
    example: [
      'salary must be a number conforming to the specified constraints',
      'salary should not be empty',
    ],
    required: true,
    description: 'Errores de validación',
    type: String,
    isArray: true,
  })
  message: string[];

  @ApiProperty({
    example: 'Bad Request',
    required: true,
    description: 'Nombre del eror',
  })
  error: string;

  @ApiProperty({
    example: 400,
    required: true,
    description: 'Código HTTP',
  })
  statusCode: number;
}
