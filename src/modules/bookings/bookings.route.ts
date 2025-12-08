import express from "express";
import { bookingsControllers } from "./bookings.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("admin", "customer"), bookingsControllers.postBookings);

export const bookingsRoute = router;
