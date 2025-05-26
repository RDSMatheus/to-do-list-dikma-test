import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarefa, TarefaStatus } from '../schema/tarefa.schema';
import { CreateTarefaDto } from '../dto/create-tarefa.dto';
import { TarefaRepository } from './tarefa.repository';
import { UpdateBody, UpdateTarefa } from '../dto/update-dto';

describe('TarefaRepository', () => {
  let mockTarefaModel: jest.Mocked<Model<Tarefa>>;
  let repository: TarefaRepository;

  beforeAll(async () => {
    mockTarefaModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    } as unknown as jest.Mocked<Model<Tarefa>>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Tarefa.name),
          useValue: mockTarefaModel,
        },
        TarefaRepository,
      ],
    }).compile();

    repository = module.get<TarefaRepository>(TarefaRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createTask', () => {
    it('chama Model.create e retorna o documento criado', async () => {
      const dto: CreateTarefaDto = { titulo: 'Teste', descricao: 'Desc' };

      const savedDoc: Tarefa = {
        titulo: 'Teste',
        descricao: 'Desc',
        status: TarefaStatus.pending,
        dataConclusao: null,
      };

      (mockTarefaModel.create as jest.Mock).mockResolvedValue(savedDoc);

      const result = await repository.createTask(dto);

      expect(result).toMatchObject(savedDoc);
    });
  });

  describe('getTasks', () => {
    it('retorna todas as tarefas sem filtro (find().limit().skip())', async () => {
      const tasks: Tarefa[] = [
        {
          dataConclusao: null,
          descricao: 'testando',
          status: TarefaStatus.pending,
          titulo: 'teste',
        },
        {
          dataConclusao: null,
          descricao: 'testando',
          status: TarefaStatus.pending,
          titulo: 'teste',
        },
      ];

      const skipMock = jest.fn().mockResolvedValue(tasks);
      const limitMock = jest.fn().mockReturnValue({ skip: skipMock });
      const findMock = jest.fn().mockReturnValue({ limit: limitMock });

      mockTarefaModel.find = findMock;

      const result = await repository.getTasks({ limit: 10, skip: 0 });

      expect(findMock).toHaveBeenCalledWith();
      expect(limitMock).toHaveBeenCalledWith(10);
      expect(skipMock).toHaveBeenCalledWith(0);
      expect(result).toMatchObject(tasks);
    });

    it('retorna tarefas filtradas por status', async () => {
      const list: Tarefa[] = [
        {
          titulo: 'tarefa filtrada',
          descricao: 'desc filtrada',
          status: TarefaStatus.inProgress,
          dataConclusao: null,
        },
        {
          titulo: 'tarefa filtrada2',
          descricao: 'desc filtrada2',
          status: TarefaStatus.inProgress,
          dataConclusao: null,
        },
      ];

      const skipMock = jest.fn().mockResolvedValue(list);
      const limitMock = jest.fn().mockReturnValue({ skip: skipMock });
      mockTarefaModel.find.mockReturnValue({ limit: limitMock } as any);

      const result = await repository.getTasks({
        limit: 2,
        skip: 1,
        status: TarefaStatus.done,
      });

      expect(mockTarefaModel.find).toHaveBeenCalledWith({
        status: TarefaStatus.done,
      });
      expect(limitMock).toHaveBeenCalledWith(2);
      expect(skipMock).toHaveBeenCalledWith(1);
      expect(result).toEqual(list);
    });
  });

  describe('getTaskById', () => {
    it('chama findById e retorna a tarefa quando existe', async () => {
      const fakeTask: Tarefa = {
        titulo: 'teste',
        descricao: 'testando',
        dataConclusao: null,
        status: TarefaStatus.inProgress,
      };

      const findSpy = jest
        .spyOn(mockTarefaModel, 'findById')
        .mockResolvedValue(fakeTask);

      const result = await repository.getTaskById('id-valido');

      expect(findSpy).toHaveBeenCalledWith('id-valido');
      expect(result).toBe(fakeTask);
    });

    it('retorna null se a tarefa não existir', async () => {
      const findSpy = jest
        .spyOn(mockTarefaModel, 'findById')
        .mockResolvedValue(null);

      const result = await repository.getTaskById('missing');

      expect(findSpy).toHaveBeenCalledWith('missing');
      expect(result).toBeNull();
    });
  });

  describe('updateTask', () => {
    it('chama findByIdAndUpdate e retorna o documento atualizado', async () => {
      const fakeTask: UpdateBody = {
        titulo: 'teste atualizado',
        descricao: 'testando',
        dataConclusao: undefined,
        status: TarefaStatus.inProgress,
      };

      const findSpy = jest
        .spyOn(mockTarefaModel, 'findByIdAndUpdate')
        .mockResolvedValue(fakeTask);

      const result = await repository.updateTask({
        id: 'id-valido',
        body: fakeTask,
      });

      expect(findSpy).toHaveBeenCalledWith('id-valido', fakeTask, {
        new: true,
      });

      expect(result).toBe(fakeTask);
    });

    it('retorna null se não encontrar para atualizar', async () => {
      const findSpy = jest
        .spyOn(mockTarefaModel, 'findByIdAndUpdate')
        .mockResolvedValue(null);

      const result = await repository.updateTask({
        id: 'no-id',
        body: {},
      });

      expect(findSpy).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('chama findByIdAndDelete e retorna o documento deletado', async () => {
      const fakeTask: UpdateBody = {
        titulo: 'teste atualizado',
        descricao: 'testando',
        dataConclusao: undefined,
        status: TarefaStatus.inProgress,
      };

      const findSpy = jest
        .spyOn(mockTarefaModel, 'findByIdAndDelete')
        .mockResolvedValue(fakeTask);

      const result = await repository.deleteTask('id-valido');

      expect(findSpy).toHaveBeenCalledWith('id-valido');

      expect(result).toBe(fakeTask);
    });

    it('retorna null se não encontrar para deletar', async () => {
      const findSpy = jest
        .spyOn(mockTarefaModel, 'findByIdAndDelete')
        .mockResolvedValue(null);

      const result = await repository.deleteTask('nope');

      expect(findSpy).toHaveBeenCalledWith('nope');
      expect(result).toBeNull();
    });
  });
});
