import { Todo } from '../../domain/entities/todo';
import { TodoRepository } from '../../domain/reposotories/todoRepository';


const todos: Todo[] = [];

export class TodoRepositoryImpl implements TodoRepository {
  async findById(id: string): Promise<Todo | null> {
    return todos.find(todo => todo.id === id) || null;
  }

  async findAll(): Promise<Todo[]> {
    return [...todos]; 
  }

  async save(todo: Todo): Promise<Todo> {
    todos.push(todo);
    return todo;
  }

  async update(id: string, todoUpdate: Partial<Todo>): Promise<Todo> {
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updatedTodo = {
      ...todos[index],
      ...todoUpdate,
      updatedAt: new Date()
    };

    todos[index] = updatedTodo;
    return { ...updatedTodo }; 
  }

  async delete(id: string): Promise<boolean> {
    // const initialLength = todos.length;
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      return true;
    }
    return false;
  }

  async findByCompletionStatus(completed: boolean): Promise<Todo[]> {
    return todos.filter(todo => todo.completed === completed);
  }

  async markAsCompleted(id: string): Promise<Todo> {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], completed: true, updatedAt: new Date() };
      return { ...todos[index] };
    }
    throw new Error(`Todo with id ${id} not found`);
  }
}