import { z } from 'zod';

const status = ['pendente', 'em andamento', 'concluída'] as const;

const statusEnum = z.enum(status);

export const TarefaDto = z.object({
  titulo: z.string().min(1, { message: 'Insira um titulo' }),
  descricao: z.string().optional(),
  status: statusEnum,
});
