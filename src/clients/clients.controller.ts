import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientDto, ClientDtoProperties } from './dto/client.dto';

import {
  transformClientEntityToDto,
  transformClientEntityToDtoProperties,
} from './dto/transform';
import { ScoringService } from '../scoring/scoring.service';
import {
  BadRequestOpenApiExampleDTO,
  ClientScoringDTO,
  NotFoundOpenApiExampleDTO,
} from './dto/open-api-examples.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly scoringService: ScoringService,
  ) {}

  @ApiOperation({
    summary: 'Crear un nuevo cliente junto con sus mensajes y deudas.',
  })
  @ApiBody({
    type: CreateClientDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado',
    type: ClientDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Errores de validación',
    type: BadRequestOpenApiExampleDTO,
  })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    delete createClientDto['id']; //ensure the object doesn't have id

    createClientDto.messages?.forEach(v=> delete v['id'] );
    createClientDto.debts?.forEach(v=> delete v['id'] );

    return this.clientsService
      .create(createClientDto)
      .then((c) => transformClientEntityToDto(c));
  }

  @ApiOperation({ summary: 'Lista los clientes como un arreglo' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: ClientDtoProperties,
    isArray: true,
  })
  @Get()
  async findAll() {
    let clients = this.clientsService.findAll();

    return clients.then((cls) =>
      cls.map((cl) => transformClientEntityToDtoProperties(cl)),
    );
  }

  @ApiOperation({
    summary: 'Devolver la información del cliente, sus mensajes y deudas',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
    type: ClientDto,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
    type: NotFoundOpenApiExampleDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'id del cliente a ser buscado',
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService
      .findOne(+id)
      .then((cl) => transformClientEntityToDto(cl));
  }

  @ApiOperation({
    summary: 'Devolver la información del puntaje de evaluación del cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Puntaje del cliente encontrado',
    type: ClientScoringDTO,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
    type: NotFoundOpenApiExampleDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'id del cliente a ser buscado',
  })
  @Get(':id/score')
  score(@Param('id', ParseIntPipe) id: number): Promise<ClientScoringDTO> {
    return this.scoringService.calculate(+id);
  }
}
