import express from "express";
import { userControllers } from "./users.controller";
const router = express.Router();

router.post("/", userControllers.createUser);

export const userRoutes = router;
