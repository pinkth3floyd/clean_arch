

import { Container } from "../main/di/container";
import { TodoRepositoryImpl } from "../features/todo/infrastructure/repositories/todorepoimplementation";
import { CreateTodoUseCase, CREATE_TODO_USECASE } from "../features/todo/domain/usecases/createtodo";
import { GetTodosUseCase, GET_TODOS_USECASE } from "../features/todo/domain/usecases/gettodo";
import { TODO_REPOSITORY } from "../features/todo/domain/reposotories/todoRepository";

export function configureDependencies(): Container {

  const todoRepository = new TodoRepositoryImpl();
  const getTodosUseCase = new GetTodosUseCase(todoRepository);
  const createTodoUseCase = new CreateTodoUseCase(todoRepository);


  return {
    [TODO_REPOSITORY]: todoRepository,
    [GET_TODOS_USECASE]: getTodosUseCase,
    [CREATE_TODO_USECASE]: createTodoUseCase,
  };
}
