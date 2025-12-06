import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/users.routes";

const app = express();
// parser
app.use(express.json());

// init DB
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle rental system is running...");
});

// users CRUD
app.use("/api/v1/users", userRoutes);

export default app;
