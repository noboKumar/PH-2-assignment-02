import express from "express";
import auth from "../../middleware/auth";
import { vehiclesControllers } from "./vehicles.controller";

const router = express.Router();

router.post("/", auth("admin"), vehiclesControllers.postVehicles);

export const vehiclesRoute = router;
