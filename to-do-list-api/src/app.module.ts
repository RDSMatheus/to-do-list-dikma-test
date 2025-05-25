import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TarefaModule } from './tarefa/tarefa.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    TarefaModule,
  ],

  providers: [],
})
export class AppModule {}
