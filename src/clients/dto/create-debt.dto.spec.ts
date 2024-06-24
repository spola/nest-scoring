import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateDebtDto } from './create-debt.dto';

//@ValidateNested()

describe('Clients Debts DTO', () => {
  let dto: CreateDebtDto;
  let dtoPlain;

  beforeEach(async () => {
    dtoPlain = {
      institution: 'Banco Estado',
      dueDate: '2023-12-24T00:00:00.000Z',
      amount: 1000000,
    };
    dto = plainToInstance(CreateDebtDto, dtoPlain);
  });

  describe('should CreateDebtDto', () => {
    it('be valid', async () => {
      let errores: ValidationError[];

      errores = await validate(dto);
      expect(errores).toHaveLength(0);
    });
    it('be invalid dueDate', async () => {
      let errores: ValidationError[];

      dto.dueDate = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateDebtDto, {
        ...dtoPlain,
        dueDate: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);

      invalid = plainToInstance(CreateDebtDto, {
        ...dtoPlain,
        dueDate: 'no_numero',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid amount', async () => {
      let errores: ValidationError[];

      dto.amount = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateDebtDto, {
        ...dtoPlain,
        amount: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);

      invalid = plainToInstance(CreateDebtDto, {
        ...dtoPlain,
        amount: 'no_numero',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid institution', async () => {
      let errores: ValidationError[];

      dto.institution = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateDebtDto, {
        ...dtoPlain,
        institution: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
  });
});
