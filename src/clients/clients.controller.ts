import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiDefaultResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientEntity } from './entities/client.entity';
import { ClientDto, ClientDtoProperties } from './dto/client.dto';

import { transformClientEntityToDto } from './dto/transform';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiBody({
    type: CreateClientDto,
    required: true
  })
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    delete createClientDto['id']; //ensure the object doesn't have id
    return this.clientsService.create(createClientDto);
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
      cls.map((cl) => transformClientEntityToDto(cl)),
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
  })
  @ApiParam({
    name: 'id',
    description: 'id del cliente a ser buscado',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientsService
      .findOne(+id)
      .then((cl) => transformClientEntityToDto(cl));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
