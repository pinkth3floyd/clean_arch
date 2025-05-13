
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../ui/elements/card';
import { useTodoViewModel } from '../hooks/usetodoviewmodel';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodo';
import { useTodoStore } from '../store/todostore'

const TodoList: React.FC = () => {
  const { loading, error } = useTodoStore();
  const { todos } = useTodoStore(state => ({ todos: state.todos }));
  const { fetchTodos } = useTodoViewModel();
  
  useEffect(() => {
    fetchTodos();
  }, []);
  
  if (loading && !todos.length) {
    return (
      <div className="w-full p-8 flex justify-center">
        <div className="animate-pulse">Loading todos...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full p-8 flex justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <AddTodoForm />
        
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground my-4">No todos yet. Add one above!</p>
        ) : (
          <div className="space-y-2 mt-4">
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;
