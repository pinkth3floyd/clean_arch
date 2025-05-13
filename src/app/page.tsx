"use client"

import { configureDependencies } from './core/config/di';
// import { Todo } from './core/features/todo/domain/entities/todo';
import TodoList from './core/features/todo/presentation/components/TodoList';
import { ContainerProvider } from "../app/core/main/di/container";



export default function HomePage() {
  const container = configureDependencies();


  return (

   <div className="min-h-screen p-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Clean Architecture Demo</h1>
        <p className="text-muted-foreground">
          With Dependency Injection in React
        </p>
      </header>
      
      <main className="max-w-md mx-auto">
        <ContainerProvider container={container}>
        <TodoList />
        </ContainerProvider>
      </main>
    </div>
  )
}
