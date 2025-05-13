'use client';

import React, { useState, useEffect } from 'react';
import { Todo } from '../app/core/features/todo/domain/entities/todo'; 

interface TodoListClientProps {
  initialTodos: Todo[];
}

const TodoListClient: React.FC<TodoListClientProps> = ({ initialTodos }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const handleCreateTodo = async () => {
    if (newTodoText.trim()) {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodoText }),
      });
      if (response.ok) {
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
        setNewTodoText('');
      } else {
        console.error('Failed to create todo');
      }
    }
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.id}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoListClient;