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

export const bookingsControllers = {
  postBookings,
};
