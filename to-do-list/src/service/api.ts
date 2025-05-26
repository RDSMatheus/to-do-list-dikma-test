const url = "http://localhost:3000";

export enum TarefaStatus {
  done = "concluída",
  inProgress = "em andamento",
  pending = "pendente",
}

export const GET_TAREFAS = ({
  limit,
  status,
  page,
}: {
  limit?: number;
  page?: number;
  status?: TarefaStatus;
}) => {
  const params = new URLSearchParams();

  if (limit !== undefined) params.append("limit", limit.toString());
  if (status !== undefined) params.append("status", status);
  if (page !== undefined) params.append("page", page.toString());

  return {
    url: `${url}/tarefa?${params.toString()}`,
  };
};
