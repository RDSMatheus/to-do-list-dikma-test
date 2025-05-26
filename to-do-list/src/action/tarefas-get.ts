"use server";

import { GET_TAREFAS } from "@/service/api";
import { TarefaResponse } from "@/types/tarefa-response";

export default async function tarefasGet(): Promise<TarefaResponse[]> {
  const { url } = GET_TAREFAS({});
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data.tasks;
}
