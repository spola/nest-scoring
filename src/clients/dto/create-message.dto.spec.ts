import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateMessageDto } from './create-message.dto';

//@ValidateNested()

describe('Clients Messages DTO', () => {
  let dto: CreateMessageDto;
  let dtoPlain;

  beforeEach(async () => {
    dtoPlain = {
      text: 'hola, quiero comprar un dpto',
      sentAt: '2023-12-24T00:00:00.000Z',
      agent: 'client',
    };
    dto = plainToInstance(CreateMessageDto, dtoPlain);
  });

  describe('should CreateMessageDto', () => {
    it('be valid', async () => {
      let errores: ValidationError[];

      errores = await validate(dto);
      expect(errores).toHaveLength(0);
    });
    it('be invalid sentAt', async () => {
      let errores: ValidationError[];

      dto.sentAt = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateMessageDto, {
        ...dtoPlain,
        sentAt: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);

      invalid = plainToInstance(CreateMessageDto, {
        ...dtoPlain,
        sentAt: 'no_numero',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid text', async () => {
      let errores: ValidationError[];

      dto.text = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateMessageDto, {
        ...dtoPlain,
        text: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
    it('be invalid agent', async () => {
      let errores: ValidationError[];

      dto.agent = null;
      errores = await validate(dto);
      expect(errores).toHaveLength(1);

      let invalid = plainToInstance(CreateMessageDto, {
        ...dtoPlain,
        agent: '',
      });
      errores = await validate(invalid);
      expect(errores).toHaveLength(1);
    });
  });
});
