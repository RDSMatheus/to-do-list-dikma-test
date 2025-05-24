import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa/controller/tarefa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TarefaModule } from './tarefa/tarefa.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/todolist'),
    TarefaModule,
  ],

  providers: [],
})
export class AppModule {}
