import { z } from 'zod';

export const TarefaDto = z.object({
  titulo: z
    .string({ message: 'O titulo é obrigatório' })
    .min(1, { message: 'Insira um titulo' }),
  descricao: z.string().optional(),
});

export type TarefaDto = z.infer<typeof TarefaDto>;
