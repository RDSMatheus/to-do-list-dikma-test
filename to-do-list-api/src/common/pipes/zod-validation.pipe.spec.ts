import { TarefaDto } from 'src/tarefa/dto/create-tarefa.dto';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  it('should be defined', () => {
    expect(new ZodValidationPipe(TarefaDto)).toBeDefined();
  });
});
