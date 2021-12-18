import { Todo } from "@prisma/client";
import prisma from "../client";
import {
  CreateTodo,
  TodoProtocol,
  UpdateTodo,
} from "../Protocol/Todo/TodoProtocol";

export default class TodoRepository implements TodoProtocol {
  constructor() {}

  async createTodo(todo: CreateTodo): Promise<Todo> {
    return await prisma.todo.create({
      data: todo,
    });
  }

  async updateTodo(todo: UpdateTodo): Promise<Todo> {
    return await prisma.todo.update({
      where: { id: todo.id },
      data: todo,
    });
  }
}

// const todoRepository = new TodoRepository();
// export default todoRepository;
