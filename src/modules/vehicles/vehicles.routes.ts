import express from "express";
import auth from "../../middleware/auth";
import { vehiclesControllers } from "./vehicles.controller";

const router = express.Router();

router.post("/", auth("admin"), vehiclesControllers.postVehicles);
router.get("/", vehiclesControllers.getAllVehicles);
router.get("/:vehicleId", vehiclesControllers.getSingleVehicle);
router.put("/:vehicleId", auth("admin"), vehiclesControllers.updateVehicles);
router.delete("/:vehicleId", auth("admin"), vehiclesControllers.deleteVehicle);

export const vehiclesRoute = router;
