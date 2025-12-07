import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const postVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.postVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Data retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControllers = {
  postVehicles,
};
