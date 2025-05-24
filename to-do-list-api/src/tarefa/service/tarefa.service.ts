import { Inject, Injectable } from '@nestjs/common';
import { TarefaDto } from '../dto/create-tarefa.tdo';
import { TarefaRepository } from '../repository/tarefa.repository';

@Injectable()
export class TarefaService {
  constructor(private readonly tarefaRepository: TarefaRepository) {}
  async postTask(task: TarefaDto) {
    return this.tarefaRepository.createTask(task);
  }
}
