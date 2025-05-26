import { Test, TestingModule } from '@nestjs/testing';
import { TarefaService } from './tarefa.service';
import { TarefaRepository } from '../repository/tarefa.repository';
import { Tarefa, TarefaStatus } from '../schema/tarefa.schema';
import { NotFoundException } from '@nestjs/common';

describe('TarefaService', () => {
  let service: TarefaService;
  let repoMock: Partial<jest.Mocked<TarefaRepository>>;

  beforeEach(async () => {
    repoMock = {
      createTask: jest.fn(),
      getTasks: jest.fn(),
      getTaskById: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarefaService,
        { provide: TarefaRepository, useValue: repoMock },
      ],
    }).compile();

    service = module.get<TarefaService>(TarefaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('postTask', () => {
    it('deve postar uma nova tarefa e retornar a tarefa criada', async () => {
      const task: Tarefa = {
        titulo: 'teste',
        descricao: 'testando',
        dataConclusao: null,
        status: TarefaStatus.pending,
      };

      jest.spyOn(repoMock, 'createTask').mockResolvedValue(task);

      const result = await service.postTask({
        titulo: task.titulo,
        descricao: task.descricao,
      });

      expect(repoMock.createTask).toHaveBeenCalledWith({
        titulo: task.titulo,
        descricao: task.descricao,
      });

      expect(result).toBe(task);
    });
  });

  describe('getTask', () => {
    it('deve retornar todas as tarefas', async () => {
      const tasks: Tarefa[] = [
        {
          titulo: 'teste',
          descricao: 'testando',
          dataConclusao: null,
          status: TarefaStatus.inProgress,
        },
        {
          titulo: 'teste',
          descricao: 'testando',
          dataConclusao: null,
          status: TarefaStatus.pending,
        },
      ];

      jest.spyOn(repoMock, 'getTasks').mockResolvedValue(tasks);

      const result = await service.getTasks({});

      expect(repoMock.getTasks).toHaveBeenCalledWith({
        limit: 10,
        skip: 0,
      });
      expect(result).toBe(tasks);
    });

    it('deve retornar tarefas filtradas pelo status', async () => {
      const tasks: Tarefa[] = [
        {
          titulo: 'teste',
          descricao: 'testando',
          dataConclusao: null,
          status: TarefaStatus.inProgress,
        },
        {
          titulo: 'teste',
          descricao: 'testando',
          dataConclusao: null,
          status: TarefaStatus.inProgress,
        },
      ];

      jest.spyOn(repoMock, 'getTasks').mockResolvedValue(tasks);

      const result = await service.getTasks({
        status: TarefaStatus.inProgress,
      });

      expect(repoMock.getTasks).toHaveBeenCalledWith({
        limit: 10,
        status: TarefaStatus.inProgress,
        skip: 0,
      });
      expect(result).toBe(tasks);
    });
  });

  describe('getTaskById', () => {
    it('deve retornar uma tarefa buscada pelo id', async () => {
      const task: Tarefa = {
        titulo: 'teste',
        descricao: 'testando',
        dataConclusao: null,
        status: TarefaStatus.pending,
      };

      jest.spyOn(repoMock, 'getTaskById').mockResolvedValue(task);

      const result = await service.getTaskById('id-valido');

      expect(repoMock.getTaskById).toHaveBeenCalledWith('id-valido');

      expect(result).toBe(task);
    });

    it('deve lançar uma NotFoundException', async () => {
      jest.spyOn(repoMock, 'getTaskById').mockResolvedValue(null);

      await expect(
        service.getTaskById('id-inexistente'),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(repoMock.getTaskById).toHaveBeenCalledWith('id-inexistente');
    });
  });

  describe('updateTask', () => {
    it('deve atualizar um tarefa existente via id e retornar', async () => {
      const task: Tarefa = {
        titulo: 'teste atualizado',
        descricao: 'testando',
        dataConclusao: null,
        status: TarefaStatus.pending,
      };

      jest.spyOn(repoMock, 'updateTask').mockResolvedValue(task);

      const result = await service.updateTask({
        id: 'id-valido',
        body: { titulo: 'teste atualizado' },
      });

      expect(repoMock.updateTask).toHaveBeenCalledWith({
        id: 'id-valido',
        body: { titulo: 'teste atualizado' },
      });

      expect(result).toBe(task);
    });

    it('deve atualizar a dataConclusao caso o status seja atualiza para TarefaStatus.done', async () => {
      const task: Tarefa = {
        titulo: 'teste atualizado',
        descricao: 'testando',
        dataConclusao: new Date(),
        status: TarefaStatus.pending,
      };

      jest.spyOn(repoMock, 'updateTask').mockResolvedValue(task);

      const result = await service.updateTask({
        id: 'id-valido',
        body: {
          status: TarefaStatus.done,
          titulo: 'teste atualizado',
          dataConclusao: new Date(),
        },
      });

      expect(repoMock.updateTask).toHaveBeenCalledWith({
        id: 'id-valido',
        body: {
          status: TarefaStatus.done,
          titulo: 'teste atualizado',
          dataConclusao: new Date(),
        },
      });

      expect(result).toBe(task);
    });

    it('deve lançar NotFoundException se a task não existir', async () => {
      jest.spyOn(repoMock, 'updateTask').mockResolvedValue(null);

      await expect(
        service.updateTask({ id: 'id-invalido', body: {} }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(repoMock.updateTask).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('deve deletar uma tarefa usando o id da tarefa', async () => {
      const task: Tarefa = {
        titulo: 'teste',
        descricao: 'descrição',
        dataConclusao: null,
        status: TarefaStatus.pending,
      };
      jest.spyOn(repoMock, 'deleteTask').mockResolvedValue(task);

      await expect(service.deleteTask('id-valido')).resolves.toBeUndefined();

      expect(repoMock.deleteTask).toHaveBeenCalledWith('id-valido');
    });

    it('deve lançar NotFoundException se a tarefa não existir', async () => {
      jest.spyOn(repoMock, 'deleteTask').mockResolvedValue(null);

      await expect(service.deleteTask('id-invalido')).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(repoMock.deleteTask).toHaveBeenCalledWith('id-invalido');
    });
  });
});
