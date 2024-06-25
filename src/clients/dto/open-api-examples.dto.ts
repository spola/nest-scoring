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


export class NotFoundOpenApiExampleDTO {
    @ApiProperty({
      example: 'Client "2" not found',
      required: true,
      description: 'Errores de validación',
      type: String,
    })
    message: string;
  
    @ApiProperty({
      example: 'Not Found',
      required: true,
      description: 'Nombre del eror',
    })
    error: string;
  
    @ApiProperty({
      example: 404,
      required: true,
      description: 'Código HTTP',
    })
    statusCode: number;
  }

  export class ClientScoringDTO {
    @ApiProperty({
        example: 75.256,
        required: true,
        description: 'Puntaje del cliente'
    })
    scoring:number;
  }