import { Todo } from "@prisma/client";
import {
  CreateTodo,
  TodoProtocol,
  UpdateTodo,
} from "../Protocol/Todo/TodoProtocol";
import TodoRepository from "../Repository/todoRepository";

export default class TodoUseCase implements TodoProtocol {
  todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  async getTodos(): Promise<Todo[]> {
    return await this.todoRepository.getTodos();
  }

  async createTodo(todo: CreateTodo): Promise<Todo> {
    return await this.todoRepository.createTodo(todo);
  }

  async updateTodo(todo: UpdateTodo): Promise<Todo> {
    return this.todoRepository.updateTodo(todo);
  }
}
