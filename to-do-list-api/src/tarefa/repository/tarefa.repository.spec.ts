import { TarefaRepository } from './tarefa.repository';

describe('TarefaRepository', () => {
  it('should be defined', () => {
    expect(new TarefaRepository()).toBeDefined();
  });
});
