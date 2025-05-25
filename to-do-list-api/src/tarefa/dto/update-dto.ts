import { TarefaStatus } from '../schema/tarefa.schema';

export type UpdateBody = {
  titulo?: string;
  descricao?: string;
  status?: TarefaStatus;
  dataConclusao?: Date;
};

export type UpdateTarefa = {
  id: string;
  body: UpdateBody;
};
