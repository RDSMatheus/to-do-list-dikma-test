import { TarefaDto } from '../../tarefa/dto/create-tarefa.dto';
import { ZodValidationPipe } from './zod-validation.pipe';
import { z, ZodSchema } from 'zod';
import {
  ArgumentMetadata,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('ZodValidationPipe', () => {
  const userSchema: ZodSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    desc: z.string().optional(),
  });

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: undefined,
    data: '',
  };

  let pipe: ZodValidationPipe;

  beforeEach(() => {
    pipe = new ZodValidationPipe(userSchema);
  });

  it('should be defined', () => {
    expect(new ZodValidationPipe(TarefaDto)).toBeDefined();
  });

  it('deve retornar o objeto validado quando o input está correto', () => {
    const dto = { title: 'Test', desc: 'Test' };

    const result = pipe.transform(dto, metadata);

    expect(result).toEqual(dto);
  });

  it('deve lançar BadRequestException se o input violar o schema', () => {
    const badDto = { title: '', desc: 'test' };

    try {
      pipe.transform(badDto, metadata);
      fail('Esperava BadRequestException');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);

      const response = (err as BadRequestException).getResponse() as any;
      expect(response.message).toHaveProperty('title');
      expect(response.message.title).toContain('Title is required');
    }
  });

  it('deve lançar InternalServerErrorException para erros não-Zod', () => {
    const badSchemaObj = {
      parse: () => {
        throw new Error('boom');
      },
    };

    const badSchema = badSchemaObj as unknown as ZodSchema;

    const badPipe = new ZodValidationPipe(badSchema);

    expect(() => badPipe.transform({ any: 'thing' }, metadata)).toThrow(
      InternalServerErrorException,
    );
  });
});
