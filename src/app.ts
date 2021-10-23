import express from "express";
import { PrismaClient } from "@prisma/client";
import userController from "./controllers/userController";
import genreController from "./controllers/genreController";
import todoController from "./controllers/todoController";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

app.use("/users", userController);

app.use("/genres", genreController);

app.use("/todos", todoController);

export default app;
