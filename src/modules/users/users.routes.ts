import express from "express";
import { userControllers } from "./users.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.getUser);
router.put("/:userId", auth(), userControllers.updateUser);
router.delete("/:userId", auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
