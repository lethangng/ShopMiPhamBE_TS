import { Request, Response } from "express";
import Role from "../db/models/Role";

const getRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roles = await Role.findAll();
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
    const create = await Role.create({
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

const updateRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { roleName } = req.body;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        errCode: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    role.roleName = roleName;
    await role.save();

    return res.status(200).json({
      errCode: 0,
      message: "Updated!",
      data: role,
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

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        errCode: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    await role.destroy();
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

const getRoleById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({
        errCode: 404,
        message: "Data Not Found",
        data: null,
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "Find ok!",
      data: role,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: error.message,
      errors: error,
    });
  }
};

export default { getRole, createRole, updateRole, deleteRole, getRoleById };
