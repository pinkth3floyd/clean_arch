
import { Todo } from '../../domain/entities/todo';
import { TodoRepository } from '../../domain/reposotories/todoRepository';
// import { AsyncLocalStorage } from 'async_hooks';


export class TodoRepositoryImpl implements TodoRepository {
  private storageKey = 'todos';

  private getStoredTodos(): Todo[] {
    // const storedTodos = localStorage.getItem(this.storageKey);
     const storedTodos = localStorage.getItem(this.storageKey);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  private saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  async findById(id: string): Promise<Todo | null> {
    const todos = this.getStoredTodos();
    const todo = todos.find(todo => todo.id === id);
    return todo || null;
  }

  async findAll(): Promise<Todo[]> {
    return this.getStoredTodos();
  }

  async save(todo: Todo): Promise<Todo> {
    const todos = this.getStoredTodos();
    todos.push(todo);
    this.saveTodos(todos);
    return todo;
  }

  async update(id: string, todoUpdate: Partial<Todo>): Promise<Todo> {
    const todos = this.getStoredTodos();
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
    this.saveTodos(todos);
    
    return updatedTodo;
  }

  async delete(id: string): Promise<boolean> {
    const todos = this.getStoredTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    
    if (filteredTodos.length === todos.length) {
      return false;
    }
    
    this.saveTodos(filteredTodos);
    return true;
  }

  async findByCompletionStatus(completed: boolean): Promise<Todo[]> {
    const todos = this.getStoredTodos();
    return todos.filter(todo => todo.completed === completed);
  }

  async markAsCompleted(id: string): Promise<Todo> {
    return this.update(id, { completed: true });
  }
}
