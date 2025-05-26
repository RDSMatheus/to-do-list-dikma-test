export type TarefaResponse = {
  _id: string;
  titulo: string;
  descricao: string;
  status: string;
  dataConclusao: null | Date;
  dataCriacao: Date;
  updatedAt: Date;
};
