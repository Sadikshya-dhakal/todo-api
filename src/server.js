import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { TodoModel } from "./todo/model/todo.model.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "hello from todo-api" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/todos", async (_req, res) =>{
    try{
        const todos = await TodoModel.find().sort({ createdAt: -1});
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error:err.message});
    }
});

app.post("/todos", async (req, res) =>{

    console.log(req.body);
    const {title} = req.body ?? {};
    if (!title || !title.trim()){
        return res.status(400).json({error: "title is required" });
    }
    const todo = await TodoModel.create({ title: title.trim() });
    res.status(201).json(todo);
});

app.listen(3000, () => console.log("listening on http://localhost:3000"));