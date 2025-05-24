import { Injectable, NotFoundException } from '@nestjs/common';
import { TarefaDto } from '../dto/create-tarefa.tdo';
import { TarefaRepository } from '../repository/tarefa.repository';
import { Tarefa, TarefaStatus } from '../schema/tarefa.schema';

@Injectable()
export class TarefaService {
  constructor(private readonly tarefaRepository: TarefaRepository) {}
  async postTask(task: TarefaDto): Promise<Tarefa> {
    return this.tarefaRepository.createTask(task);
  }

  async getTasks({
    status,
    limit,
    page,
  }: {
    status?: TarefaStatus;
    limit?: string;
    page?: string;
  }): Promise<Tarefa[]> {
    const parsedLimit = limit ? Number(limit) : 10;
    const parsedPage = page ? Number(page) : 1;
    return this.tarefaRepository.getTasks({
      limit: parsedLimit,
      skip: parsedPage,
      status: status,
    });
  }

  async getTaskById(id: string): Promise<Tarefa | null> {
    const task = await this.tarefaRepository.getTaskById(id);

    if (!task)
      throw new NotFoundException({
        message: 'Tarefa não encontrada ou inexistente',
      });

    return task;
  }
}
