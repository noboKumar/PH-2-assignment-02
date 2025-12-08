import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

const postBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const result = await bookingsServices.postBookings(req.body, userId);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;
    console.log(req.user!);
    const result = await bookingsServices.getBookings(userId, userRole);
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(403).json({
      success: false,
      message: "You are not allowed to view these bookings",
    });
  }
};

export const bookingsControllers = {
  postBookings,
  getBookings,
};
