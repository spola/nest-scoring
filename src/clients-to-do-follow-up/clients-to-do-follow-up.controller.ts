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
import { ClientsToDoFollowUpService } from './clients-to-do-follow-up.service';
import { ClientDto, ClientDtoProperties } from '../clients/dto/client.dto';
import { resolve } from 'path';
import { transformClientEntityToDto, transformClientEntityToDtoProperties } from '../clients/dto/transform';

@ApiTags('clients-to-do-follow-up')
@Controller('clients-to-do-follow-up')
export class ClientsToDoFollowUpController {
  constructor(
    private readonly clientsToDoFollowUpService: ClientsToDoFollowUpService,
  ) {}

  @ApiOperation({
    summary:
      'Lista de los clientes en que el último mensaje haya sido hace más de 7 días. Utiliza Query Builder y filtra en memoria.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: ClientDtoProperties,
    isArray: true,
  })
  @Get("querybuilder")
  async findAllQueryBuilder() : Promise<ClientDtoProperties[]> {
    let clients = this.clientsToDoFollowUpService.findAllQueryBuilder();

    return clients.then((cls) =>
      cls.map((cl) => transformClientEntityToDtoProperties(cl)),
    );
  }

  @ApiOperation({
    summary:
      'Lista de los clientes en que el último mensaje haya sido hace más de 7 días',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
    type: ClientDtoProperties,
    isArray: true,
  })
  @Get()
  async findAll() : Promise<ClientDtoProperties[]> {
    let clients = this.clientsToDoFollowUpService.findAll();

    return clients.then((cls) =>
      cls.map((cl) => transformClientEntityToDtoProperties(cl)),
    );
  }
}
