import { Injectable, NotFoundException } from '@nestjs/common';
import { TarefaDto } from '../dto/create-tarefa.dto';
import { TarefaRepository } from '../repository/tarefa.repository';
import { Tarefa, TarefaStatus } from '../schema/tarefa.schema';
import { UpdateTarefa } from '../dto/update-dto';

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
    return await this.tarefaRepository.getTasks({
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

  async updateTask({ id, body }: UpdateTarefa): Promise<Tarefa | null> {
    if (body.status === TarefaStatus.done) {
      body.dataConclusao = new Date();
    }

    const task = await this.tarefaRepository.updateTask({ id, body: body });

    if (!task)
      throw new NotFoundException({ message: 'Tarefa não encontrada.' });

    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.tarefaRepository.deleteTask(id);

    if (!task)
      throw new NotFoundException({ message: 'Tarefa não encontrada.' });

    return;
  }
}
