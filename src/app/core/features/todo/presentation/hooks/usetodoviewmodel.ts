"use client"
import { useEffect } from 'react';
import { useContainer } from '../../../../main/di/container';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/entities/todo';
import { CreateTodoUseCase, CREATE_TODO_USECASE } from '../../domain/usecases/createtodo';
import { GetTodosUseCase, GET_TODOS_USECASE } from '../../domain/usecases/gettodo';
import { TodoRepository, TODO_REPOSITORY } from '../../domain/reposotories/todoRepository';
import { useTodoStore } from '../store/todostore';

export const useTodoViewModel = () => {
 
  const { 
    todos, 
    loading, 
    error, 
    setTodos, 
    addTodo, 
    updateTodoInStore, 
    removeTodo, 
    setLoading, 
    setError 
  } = useTodoStore();
  
 
  const getTodosUseCase = useContainer<GetTodosUseCase>(GET_TODOS_USECASE);
  const createTodoUseCase = useContainer<CreateTodoUseCase>(CREATE_TODO_USECASE);
  const todoRepository = useContainer<TodoRepository>(TODO_REPOSITORY);
  
  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  });
  
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getTodosUseCase.execute();
      setTodos(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const createTodo = async (data: CreateTodoDTO) => {
    try {
      setLoading(true);
      setError(null);
      const newTodo = await createTodoUseCase.execute(data);
      addTodo(newTodo);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const updateTodo = async (id: string, data: UpdateTodoDTO) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTodo = await todoRepository.update(id, data);
      updateTodoInStore(id, updatedTodo);
      return updatedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const deleteTodo = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await todoRepository.delete(id);
      if (success) {
        removeTodo(id);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const markAsCompleted = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTodo = await todoRepository.markAsCompleted(id);
      updateTodoInStore(id, updatedTodo);
      return updatedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark todo as completed');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    markAsCompleted
  };
};
