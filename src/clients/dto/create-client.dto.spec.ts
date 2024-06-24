import { ValidationError, validate } from 'class-validator';
import { CreateClientDto } from './create-client.dto';
import { error } from 'console';
import { plainToInstance } from 'class-transformer';
import { ClientEntity } from '../entities/client.entity';

//@ValidateNested()

describe('Clients DTO', () => {
  let dto: CreateClientDto;
  let dtoPlain;

  beforeEach(async () => {
    dtoPlain = {
      name: "Juan Pérez O'Higgins Ñuble",
      rut: '22.222.222-2',
      salary: 100000,
      savings: 5000000,
    };
    dto = plainToInstance(CreateClientDto, dtoPlain);
  });

  describe('should CreatePruebaDto', () => {
    it('be valid', async () => {
      let errores: ValidationError[];

      errores = await validate(dto);
      expect(errores).toHaveLength(0);
    });
    it('be invalid salary', async () => {
      let errores: ValidationError[];

      dto.salary = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateClientDto, {
        ...dtoPlain,
        salary: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);

      invalid = plainToInstance(CreateClientDto, {
        ...dtoPlain,
        salary: 'no_numero',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid savings', async () => {
      let errores: ValidationError[];

      dto.savings = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateClientDto, {
        ...dtoPlain,
        savings: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);

      invalid = plainToInstance(CreateClientDto, {
        ...dtoPlain,
        savings: 'no_numero',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid name', async () => {
      let errores: ValidationError[];

      dto.name = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateClientDto, {
        ...dtoPlain,
        name: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid rut', async () => {
      let errores: ValidationError[];

      dto.rut = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateClientDto, {
        ...dtoPlain,
        rut: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('should ignore id', async () => {
      dtoPlain.id = 1000;
      let d = plainToInstance(CreateClientDto, dtoPlain);

      console.info(d);

      expect(d).toBeDefined();

      let errores = await validate(d);
      expect(errores).toHaveLength(0);
    });
  });
});
