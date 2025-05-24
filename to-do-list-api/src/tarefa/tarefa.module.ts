import { Module } from '@nestjs/common';
import { TarefaController } from './controller/tarefa.controller';
import { TarefaService } from './service/tarefa.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tarefa, TarefaSchema } from './schema/tarefa.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarefa.name, schema: TarefaSchema }]),
  ],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
