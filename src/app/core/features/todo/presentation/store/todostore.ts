
import { create } from 'zustand';
import { Todo,  } from '../../domain/entities/todo';


interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  
  // Actions
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodoInStore: (id: string, updatedTodo: Todo) => void;
  removeTodo: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  error: null,
  
  // Actions
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ 
    todos: [...state.todos, todo] 
  })),
  updateTodoInStore: (id, updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) => todo.id === id ? updatedTodo : todo)
  })),
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
