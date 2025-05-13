
import { NoInputUseCase } from '../../../../main/domain/interfaces/usecase';
import { Todo } from '../entities/todo';
import { TodoRepository } from '../reposotories/todoRepository';

export class GetTodosUseCase implements NoInputUseCase<Todo[]> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}


export const GET_TODOS_USECASE = 'getTodosUseCase';
