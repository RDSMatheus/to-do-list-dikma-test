import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TarefaDocument = HydratedDocument<Tarefa>;

export enum TarefaStatus {
  pending = 'pendente',
  inProgress = 'em andamento',
  done = 'concluída',
}

@Schema({ timestamps: { createdAt: 'dataCriacao' } })
export class Tarefa {
  @Prop({ required: true })
  titulo: string;

  @Prop()
  descricao: string;

  @Prop({
    type: String,
    enum: TarefaStatus,
    default: TarefaStatus.pending,
    required: true,
  })
  status: TarefaStatus;

  @Prop({ type: Date, default: null })
  dataConclusao: Date | null;
}

export const TarefaSchema = SchemaFactory.createForClass(Tarefa);
