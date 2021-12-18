import { Request, Response, Router } from "express";
import { CreateTodo, UpdateTodo } from "../Protocol/Todo/TodoProtocol";
import TodoUseCase from "../UseCase/todoUseCase";

const router = Router();

const useCase = new TodoUseCase();

// POST /todos
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const todo: CreateTodo = {
      title: title,
      description: description,
    };

    const createdTodo = await useCase.createTodo(todo);
    res.status(201).send(createdTodo);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// PUT /todos/{todo_id}
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id, title, description } = req.body;

    const todo: UpdateTodo = {
      id: id,
      title: title,
      description: description,
    };

    const updatedTodo = await useCase.updateTodo(todo);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

export default router;
