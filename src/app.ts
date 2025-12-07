import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
// parser
app.use(express.json());

// init DB
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Vehicle rental system is running...");
});

// auth CRUD
app.use("/api/v1/auth", authRoutes);

// users CRUD
app.use("/api/v1/users", userRoutes);

export default app;
