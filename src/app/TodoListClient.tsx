"use client"
import React, { useState, useEffect } from 'react';
import { Todo } from '../app/core/features/todo/domain/entities/todo'; 

interface HomePageClientProps {
  initialTodos: Todo[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ initialTodos }) => {


  console.log("List of todos"+initialTodos);
  const [todos, setTodos] = useState<Todo[]>(initialTodos || []); 
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    
    if (!initialTodos) {
      
    }
  }, [initialTodos]);

  return (
    <div>
      <h1>Todos</h1>
    
    </div>
  );
};

export default HomePageClient;