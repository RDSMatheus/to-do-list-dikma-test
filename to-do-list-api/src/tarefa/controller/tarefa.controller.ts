import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { TarefaService } from '../service/tarefa.service';
import { TarefaDto } from '../dto/create-tarefa.tdo';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { Response } from 'express';

@Controller('tarefa')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(TarefaDto))
  async createTask(@Body() tarefaDto: TarefaDto, @Res() res: Response) {
    const taks = await this.tarefaService.postTask(tarefaDto);
    res.status(HttpStatus.CREATED).json({ message: 'Tarefa criada.', taks });
  }
}
