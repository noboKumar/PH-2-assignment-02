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

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getSingleVehicles(
      req.params.id as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControllers = {
  postVehicles,
  getAllVehicles,
  getSingleVehicles,
};
