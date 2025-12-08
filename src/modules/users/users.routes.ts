import express from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getUser);
router.put("/:userId", auth(), userControllers.updateUser);

export const userRoutes = router;
