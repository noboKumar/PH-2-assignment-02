import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const postVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.postVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
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

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getSingleVehicle(
      req.params.vehicleId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle created successfully",
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

const updateVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.updateVehicle(
      req.body,
      req.params.vehicleId as string
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
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicle(
      req.params.vehicleId as string
    );
    console.log(req.params.vehicleId);
    console.log(result);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Cannot delete vehicle",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Data deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControllers = {
  postVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateVehicles,
  deleteVehicle,
};
