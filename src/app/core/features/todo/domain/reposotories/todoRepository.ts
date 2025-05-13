
import { Repository } from '../../../../main/domain/interfaces/repository';
import { Todo } from '../entities/todo';

export interface TodoRepository extends Repository<Todo, string> {
  findByCompletionStatus(completed: boolean): Promise<Todo[]>;
  markAsCompleted(id: string): Promise<Todo>;
}

export const TODO_REPOSITORY = 'todoRepository';
