import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { TarefaService } from '../service/tarefa.service';
import { CreateTarefaDto, TarefaDto } from '../dto/create-tarefa.tdo';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { Response } from 'express';
import { TarefaStatus } from '../schema/tarefa.schema';

@Controller('tarefa')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(TarefaDto))
  async createTask(@Body() tarefaDto: CreateTarefaDto, @Res() res: Response) {
    const task = await this.tarefaService.postTask(tarefaDto);
    res.status(HttpStatus.CREATED).json({ message: 'Tarefa criada.', task });
  }

  @Get()
  async getTasks(
    @Res() res: Response,
    @Query('status') status?: TarefaStatus,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit?: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe)
    page?: string,
  ) {
    const tasks = await this.tarefaService.getTasks({ status, limit, page });
    res.status(HttpStatus.OK).json({ message: 'Tarefas retornadas.', tasks });
  }
}
