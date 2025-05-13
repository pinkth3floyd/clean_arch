
import { UseCase } from '../../../../main/domain/interfaces/usecase';
import { CreateTodoDTO, Todo } from '../entities/todo';
import { TodoRepository } from '../reposotories/todoRepository';

export class CreateTodoUseCase implements UseCase<CreateTodoDTO, Todo> {
  constructor(private todoRepository: TodoRepository) {}

  async execute(input: CreateTodoDTO): Promise<Todo> {
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.todoRepository.save(newTodo);
  }
}


export const CREATE_TODO_USECASE = 'createTodoUseCase';
