'use server';

import Home from './TodoListClient';
import { configureDependencies } from './core/config/di';
import { GET_TODOS_USECASE } from './core/features/todo/domain/usecases/gettodo';
import { Todo } from './core/features/todo/domain/entities/todo';
import TodoList from './core/features/todo/presentation/components/TodoList';

interface HomePageProps {
  initialTodos: Todo[];
}

export default async function HomePage() {
  const container = configureDependencies();
  const getTodosUseCase = container[GET_TODOS_USECASE];
  const initialTodos: Todo[] = await getTodosUseCase.execute();

  return (

   <div className="min-h-screen p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Clean Architecture Demo</h1>
        <p className="text-muted-foreground">
          With Dependency Injection in React
        </p>
      </header>
      
      <main className="max-w-md mx-auto">
        <TodoList />
      </main>
    </div>
  )
}
