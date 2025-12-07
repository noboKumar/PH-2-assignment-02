import express from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getUser);

export const userRoutes = router;
