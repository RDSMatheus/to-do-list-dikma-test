import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa/controller/tarefa.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017/todolist')],
  controllers: [TarefaController],
  providers: [],
})
export class AppModule {}
