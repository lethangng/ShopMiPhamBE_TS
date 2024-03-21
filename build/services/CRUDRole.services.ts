import { Request, Response } from "express";
import { User } from "../db/models";

const getRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await User.findAll();
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      data: roles,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: error.message,
      errors: error,
    });
  }
};

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { roleName, active } = req.body;
    const create = await User.create({
      roleName,
    });
    return res.status(201).json({
      errCode: 0,
      message: "Created!",
      data: create,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: error.message,
      errors: error,
    });
  }
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        errCode: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    await user.destroy();
    return res.status(200).json({
      errCode: 0,
      message: "Deleted!",
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: error.message,
      errors: error,
    });
  }
};

export default {
  deleteRole,
  getRole,
  createRole,
};
