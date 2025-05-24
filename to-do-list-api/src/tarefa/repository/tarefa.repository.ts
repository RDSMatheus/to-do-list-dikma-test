import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tarefa } from '../schema/tarefa.schema';
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
}
