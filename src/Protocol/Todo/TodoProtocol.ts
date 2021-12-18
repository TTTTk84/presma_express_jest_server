import { Todo } from "@prisma/client";

export interface CreateTodo {
  title: string;
  description: string;
}

export interface UpdateTodo {
  id: number;
  title: string;
  description: string;
}

export interface TodoProtocol {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: CreateTodo): Promise<Todo>;
  updateTodo(todo: UpdateTodo): Promise<Todo>;
}
