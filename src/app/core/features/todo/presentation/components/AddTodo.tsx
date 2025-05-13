"use client"
import React, { useState } from 'react';
import { useTodoViewModel } from '../hooks/usetodoviewmodel';
import { Button } from '../../../../ui/elements/button';
import { Input } from '../../../../ui/elements/input';
import { Textarea } from '../../../../ui/elements/textarea';
import { useToast } from '../../../../hooks/use-toast';

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createTodo } = useTodoViewModel();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: 'Title required',
        description: 'Please enter a title for your todo',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createTodo({
        title: title.trim(),
        description: description.trim(),
      });
      
      setTitle('');
      setDescription('');
      
      toast({
        title: 'Todo created',
        description: 'Your new task has been added to the list',
      });
    } catch (err) {
      toast({
        title: 'Failed to create todo',
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          placeholder="Todo title"
          value={title}
          onChange={(e:any) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e:any) => setDescription(e.target.value)}
          rows={2}
          disabled={isSubmitting}
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </Button>
    </form>
  );
};

export default AddTodoForm;
