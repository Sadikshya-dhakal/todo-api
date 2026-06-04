import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "hello from todo-api" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(3000, () => console.log("listening on http://localhost:3000"));