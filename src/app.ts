import express from "express";
import todoController from "./controller/todoController";

const app = express();
app.use(express.json());

app.use("/todos", todoController);

export default app;
