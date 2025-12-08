import { Request, Response } from "express";
import { userServices } from "./users.service";
import bcrypt from "bcryptjs";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    res.status(201).json({
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;
    const userRole = loggedInUser.role;
    const loggedInUserId = loggedInUser.id;
    const userId = req.params.userId;
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const payload = { ...req.body };

    if (
      userRole === "customer" &&
      loggedInUser.id !== parseInt(userId as string, 10)
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own profile.",
      });
    }

    if (payload.password) {
      payload.password = hashedPass;
    }

    const result = await userServices.updateUser(
      userId as string,
      payload,
      userRole,
      loggedInUserId
    );

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;

    const result = await userServices.deleteUser(userId as string);
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  getUser,
  updateUser,
  deleteUser,
};
