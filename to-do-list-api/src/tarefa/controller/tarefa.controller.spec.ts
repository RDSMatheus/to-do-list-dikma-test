import { Test, TestingModule } from '@nestjs/testing';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from '../service/tarefa.service';
import { TarefaStatus } from '../schema/tarefa.schema';
import { NotFoundException } from '@nestjs/common';

describe('TarefaController', () => {
  let controller: TarefaController;
  let service: TarefaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarefaController],
      providers: [
        {
          provide: TarefaService,
          useValue: {
            postTask: jest.fn().mockResolvedValue({ id: '1', titulo: 'Teste' }),
            getTasks: jest.fn().mockResolvedValue([
              {
                id: '1',
                titulo: 'Teste',
                descricao: 'teste',
                status: 'em andamento',
                dataConclusao: null,
                dataCriacao: '2025-05-24T14:19:48.465Z',
                updatedAt: '2025-05-24T14:19:48.465Z',
              },
            ]),
            getTaskById: jest.fn().mockResolvedValue({
              id: '1',
              titulo: 'Teste',
              descricao: 'teste',
              status: 'pendente',
              dataConclusao: null,
              dataCriacao: '2025-05-24T14:19:48.465Z',
              updatedAt: '2025-05-24T14:19:48.465Z',
            }),
            updateTask: jest.fn().mockResolvedValue({
              id: '1',
              titulo: 'Teste',
              descricao: 'teste',
              status: 'concluída',
              dataConclusao: '2025-05-25T14:19:48.465Z',
              dataCriacao: '2025-05-24T14:19:48.465Z',
              updatedAt: '2025-05-24T14:19:48.465Z',
            }),
            deleteTask: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<TarefaController>(TarefaController);
    service = module.get<TarefaService>(TarefaService);
  });

  it('deve criar uma tarefa status 201', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const dto = { titulo: 'Teste', descricao: 'desc' };

    await controller.createTask(dto, res);

    expect(service.postTask).toHaveBeenCalledWith(dto);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tarefa criada.',
      task: { id: '1', titulo: 'Teste' },
    });
  });

  it('deve retornar uma array de tarefas status 200', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.getTasks(res, undefined, undefined, undefined);

    expect(service.getTasks).toHaveBeenCalledWith({
      status: undefined,
      limit: undefined,
      page: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tarefas retornadas.',
      tasks: [
        {
          id: '1',
          titulo: 'Teste',
          descricao: 'teste',
          status: 'em andamento',
          dataConclusao: null,
          dataCriacao: '2025-05-24T14:19:48.465Z',
          updatedAt: '2025-05-24T14:19:48.465Z',
        },
      ],
    });
  });

  it('deve retornar uma array de tarefas filtrada e status 200', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const status: TarefaStatus = TarefaStatus.pending;

    (service.getTasks as jest.Mock).mockResolvedValue([
      {
        id: '1',
        titulo: 'Teste',
        descricao: 'teste',
        status: 'pendente',
        dataConclusao: null,
        dataCriacao: '2025-05-24T14:19:48.465Z',
        updatedAt: '2025-05-24T14:19:48.465Z',
      },
      {
        id: '2',
        titulo: 'Teste',
        descricao: 'teste',
        status: 'pendente',
        dataConclusao: null,
        dataCriacao: '2025-05-24T14:19:48.465Z',
        updatedAt: '2025-05-24T14:19:48.465Z',
      },
    ]);

    await controller.getTasks(res, status, undefined, undefined);

    expect(service.getTasks).toHaveBeenCalledWith({
      status: 'pendente',
      limit: undefined,
      page: undefined,
    });

    expect(res.status).toHaveBeenCalledWith(200),
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tarefas retornadas.',
        tasks: [
          {
            id: '1',
            titulo: 'Teste',
            descricao: 'teste',
            status: 'pendente',
            dataConclusao: null,
            dataCriacao: '2025-05-24T14:19:48.465Z',
            updatedAt: '2025-05-24T14:19:48.465Z',
          },
          {
            id: '2',
            titulo: 'Teste',
            descricao: 'teste',
            status: 'pendente',
            dataConclusao: null,
            dataCriacao: '2025-05-24T14:19:48.465Z',
            updatedAt: '2025-05-24T14:19:48.465Z',
          },
        ],
      });
  });

  it('deve retornar uma tarefa com o id correspondente e status 200', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.getTaskById('1', res);

    expect(service.getTaskById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tarefa encontrada.',
      task: {
        id: '1',
        titulo: 'Teste',
        descricao: 'teste',
        status: 'pendente',
        dataConclusao: null,
        dataCriacao: '2025-05-24T14:19:48.465Z',
        updatedAt: '2025-05-24T14:19:48.465Z',
      },
    });
  });

  it('deve lançar NotFoundException se a tarefa não existir', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    (service.getTaskById as jest.Mock).mockRejectedValue(
      new NotFoundException('Tarefa não encontrada'),
    );

    await expect(
      controller.getTaskById('id-inexistente', res),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('deve atualizar a tarefa e retornar a tarefa atualizada e status 200', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const updateBody = { status: TarefaStatus.done };

    await controller.updateTask('1', updateBody, res);

    expect(service.updateTask).toHaveBeenCalledWith({
      id: '1',
      body: updateBody,
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tarefa atualizada.',
      task: {
        id: '1',
        titulo: 'Teste',
        descricao: 'teste',
        status: 'concluída',
        dataConclusao: '2025-05-25T14:19:48.465Z',
        dataCriacao: '2025-05-24T14:19:48.465Z',
        updatedAt: '2025-05-24T14:19:48.465Z',
      },
    });
  });

  it('deve deletar uma tarefa de acordo com o id e status 204', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await controller.deleteTask('1', res);

    expect(service.deleteTask).toHaveBeenCalledWith('1');

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith();
  });

  it('deve lançar NotFoundException se a tarefa não existir', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    (service.deleteTask as jest.Mock).mockRejectedValue(
      new NotFoundException('Tarefa não encontrada'),
    );

    await expect(
      controller.deleteTask('id-inexistente', res),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});
