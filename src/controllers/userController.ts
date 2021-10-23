import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// GET /users
router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

// GET /users/:id
router.get("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {id: parseInt(req.params?.id)},
  })
  res.json({ user });
});

// GET /users/:id/detail
router.get("/:id/detail", async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params?.id) },
    include: {
      genres: {
        select: {
          id: true,
          name: true,
          todos: true,
        }
      }
    }
  })
  res.json({ user });
});

// POST /users
router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = await prisma.user.create({
    data: { name }
  });
  if (user) {
    res.status(200).send("success create user")
  } else {
    res.status(500).send("error create user");
  }
})

// DELETE /users/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const user = await prisma.user.delete({
    where: { id: parseInt(req.params?.id) },
  });
  if (user) {
    res.status(200).send("success delete user")
  } else {
    res.status(500).send("error delete user");
  }
})

export default router
