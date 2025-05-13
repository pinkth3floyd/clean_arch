
import React from 'react';
import { Todo } from '../../domain/entities/todo';
import { useTodoViewModel } from '../hooks/usetodoviewmodel';
import { Checkbox } from '../../../../ui/elements/checkbox';
import { Button } from '../../../../ui/elements/button';
import { Trash } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodoViewModel();
  
  const handleToggleComplete = async () => {
    await updateTodo(todo.id, { completed: !todo.completed });
  };
  
  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };
  
  return (
    <div className={`p-4 border rounded-md flex items-center justify-between ${
      todo.completed ? 'bg-muted/50' : 'bg-card'
    }`}>
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={todo.completed} 
          onCheckedChange={handleToggleComplete}
          id={`todo-${todo.id}`}
        />
        <div>
          <label 
            htmlFor={`todo-${todo.id}`}
            className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
          >
            {todo.title}
          </label>
          {todo.description && (
            <p className={`text-sm ${todo.completed ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      
      <Button variant="ghost" size="sm" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
