import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();

// GET /genres
router.get("/", async (req: Request, res: Response) => {
  const genres = await prisma.genre.findMany();
  res.json({ genres });
});

// GET /genres/:id
router.get("/:id", async (req: Request, res: Response) => {
  const genre = await prisma.genre.findUnique({
    where: {id: parseInt(req.params?.id)},
  })
  res.json({ genre });
});

// GET /genres/:id/detail
router.get("/:id/detail", async (req: Request, res: Response) => {
  const genre = await prisma.genre.findUnique({
    where: { id: parseInt(req.params?.id) },
    include: {
      todos: {
        select: {
          name: true,
          isChecked: true,
        }
      }
    }
  })
  res.json({ genre });
});

// POST /genres
router.post("/", async (req: Request, res: Response) => {
  const { name, user_id } = req.body;
  const genre = await prisma.genre.create({
    data: {
      name: name,
      userId: user_id
    }
  });
  if (genre) {
    res.status(200).send("success create genre")
  } else {
    res.status(500).send("error create genre");
  }
})

// DELETE /genres/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const genre = await prisma.genre.delete({
    where: { id: parseInt(req.params?.id) },
  });
  if (genre) {
    res.status(200).send("success delete genre")
  } else {
    res.status(500).send("error delete genre");
  }
})

export default router
