import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// GET /todos
router.get("/", async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();
  res.json({ todos });
});

// GET /todos/:id
router.get("/:id", async (req: Request, res: Response) => {
  const todo = await prisma.todo.findUnique({
    where: {id: parseInt(req.params?.id)},
  })
  res.json({ todo });
});

// GET /todos/:id/detail
router.get("/:id/detail", async (req: Request, res: Response) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(req.params?.id) },
    include: {
      genre: true
    }
  });
  res.json({ todo });
});

// PUT /todos/:id/check
router.put("/:id/check", async (req: Request, res: Response) => {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(req.params?.id) },
  });

  if (!todo) {
    throw new Error("todo is empty")
  }

  const todo_idChecked = await prisma.todo.update({
    where: {
      id: parseInt(req.params?.id)
    },
    data: {
      isChecked: !todo.isChecked
    }
  })

  if (todo_idChecked) {
    res.status(200).json({ todo_idChecked })
  } else {
    res.status(500).send("error check todo");
  }

});


// POST /todos
router.post("/", async (req: Request, res: Response) => {
  const { name, genre_id } = req.body;
  const todo = await prisma.todo.create({
    data: {
      name: name,
      genreId: genre_id
    }
  });
  if (todo) {
    res.status(200).send("success create todo")
  } else {
    res.status(500).send("error create todo");
  }
})

// DELETE /todos/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const todo = await prisma.todo.delete({
    where: { id: parseInt(req.params?.id) },
  });
  if (todo) {
    res.status(200).send("success delete todo")
  } else {
    res.status(500).send("error delete todo");
  }
})

export default router
