'use server';

import Home from './TodoListClient';
import { configureDependencies } from './core/config/di';
import { GET_TODOS_USECASE } from './core/features/todo/domain/usecases/gettodo';
import { Todo } from './core/features/todo/domain/entities/todo';

interface HomePageProps {
  initialTodos: Todo[];
}

export default async function HomePage() {
  const container = configureDependencies();
  const getTodosUseCase = container[GET_TODOS_USECASE];
  const initialTodos: Todo[] = await getTodosUseCase.execute();

  return <Home initialTodos={initialTodos} />;
}
