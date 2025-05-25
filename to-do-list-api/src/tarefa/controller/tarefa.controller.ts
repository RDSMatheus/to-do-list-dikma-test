import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
} from '@nestjs/common';
import { TarefaService } from '../service/tarefa.service';
import { CreateTarefaDto, TarefaDto } from '../dto/create-tarefa.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { Response } from 'express';
import { TarefaStatus } from '../schema/tarefa.schema';
import { UpdateBody, UpdateTarefa } from '../dto/update-dto';
import { ApiQuery } from '@nestjs/swagger';

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

  @Get(':id')
  async getTaskById(@Param('id') id: string, @Res() res: Response) {
    const task = await this.tarefaService.getTaskById(id);
    res.status(HttpStatus.OK).json({ message: 'Tarefa encontrada.', task });
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateBody,
    @Res() res: Response,
  ) {
    const task = await this.tarefaService.updateTask({ id, body });
    res.status(HttpStatus.OK).json({ message: 'Tarefa atualizada.', task });
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Res() res: Response) {
    await this.tarefaService.deleteTask(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
