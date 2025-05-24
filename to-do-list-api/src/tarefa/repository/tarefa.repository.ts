import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tarefa, TarefaStatus } from '../schema/tarefa.schema';
import { Model } from 'mongoose';
import { TarefaDto } from '../dto/create-tarefa.tdo';

@Injectable()
export class TarefaRepository {
  constructor(@InjectModel(Tarefa.name) private tarefaModel: Model<Tarefa>) {}

  async createTask(task: TarefaDto): Promise<Tarefa> {
    const createdTask = new this.tarefaModel(task);
    await createdTask.save();

    console.log(createdTask);
    return createdTask;
  }

  async getTasks({
    limit,
    skip,
    status,
  }: {
    limit: number;
    skip: number;
    status?: TarefaStatus;
  }): Promise<Tarefa[]> {
    console.log(status);
    const createdTasks = status
      ? await this.tarefaModel.find({ status }).limit(limit).skip(skip)
      : await this.tarefaModel.find().limit(limit).skip(skip);

    console.log(createdTasks);
    return createdTasks;
  }

  async getTaskById(id: string): Promise<Tarefa | null> {
    const task = await this.tarefaModel.findById(id);
    console.log(task);
    return task;
  }
}
