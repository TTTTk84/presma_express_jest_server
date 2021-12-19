import { Todo } from "@prisma/client";
import { CreateTodo } from "../src/Protocol/TodoProtocol";
import TodoRepository from "../src/Repository/TodoRepository";
import TodoUseCase from "../src/UseCase/todoUseCase";

const todoUseCase: TodoUseCase = new TodoUseCase();

test("should create new todo ", async () => {
  const todo: CreateTodo = {
    title: "todo1",
    description: "description1",
  };
  const createdTodo: Todo = {
    id: 1,
    title: "todo1",
    description: "description1",
  };

  const repositoryCreateTodo = jest
    .spyOn(TodoRepository.prototype, "createTodo")
    .mockReturnValue(Promise.resolve(createdTodo));

  await expect(todoUseCase.createTodo(todo)).resolves.toEqual(createdTodo);
  expect(repositoryCreateTodo).toHaveBeenCalled();
});

// test("should update a todo name ", async () => {
//   const user = {
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//   };

//   prismaMock.user.update.mockResolvedValue(user);

//   await expect(updateUsername(user)).resolves.toEqual({
//     id: 1,
//     name: "Rich Haines",
//     email: "hello@prisma.io",
//   });
// });
