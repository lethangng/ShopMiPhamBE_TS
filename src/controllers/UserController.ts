import path from "path";
import { Request, Response } from "express";
import Helper from "../helpers/Helper";
import Token from "../services/Token";
import dotenv from "dotenv";
import CRUDUserService from "../services/CRUDUserService";
import User from "../db/models/User";
dotenv.config();

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword, phone, address } = req.body;
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone ||
      !address
    ) {
      return res.status(500).json({
        errCode: 500,
        message: null,
        error: "Bad request!",
        data: [],
      });
    }
    const user = await CRUDUserService.register(
      name,
      email,
      password,
      confirmPassword,
      phone,
      address
    );

    return res
      .status(201)
      .json(Helper.ResponseData(0, "Rergiter ok!", null, user));
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, confirmPassword, roleId } = req.body;
    if (!name || !email || !password || !confirmPassword || !roleId) {
      return res.status(500).json({
        errCode: 500,
        message: null,
        error: "Bad request!",
        data: [],
      });
    }
    const user = await CRUDUserService.addUser(
      name,
      email,
      password,
      confirmPassword,
      roleId
    );

    return res.status(201).json(Helper.ResponseData(0, "Created!", null, user));
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const userLogin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        errCode: 500,
        message: null,
        error: "Bad request!",
        data: [],
      });
    }
    const user = await CRUDUserService.login(email, password);
    // console.log(user);

    const token = Token.createToken(user.id);
    const refreshToken = Token.refreshToken(user.id);
    // res.cookie("token", token, { httpOnly: true });
    // res.cookie("refreshToken", refreshToken, { httpOnly: true });

    const dataUser = {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
    };

    // console.log(dataUser);
    return res.status(200).json({
      errCode: 0,
      message: "Login sussess",
      errors: null,
      user: dataUser,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error: any) {
    return res.status(400).json({
      errCode: 400,
      message: null,
      errors: error.message,
      data: [],
    });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  // const refreshToken = req.cookies.refreshToken;
  const refreshToken = req.body.refreshToken;
  // console.log(req.body);

  try {
    const decoded = Token.decodeRefreshToken(refreshToken);
    const userId = decoded.userId;

    // Tạo mới access token
    const accessToken = Token.createToken(userId);
    const refreshTokenNew = Token.refreshToken(userId);

    // res.cookie("token", accessToken, { httpOnly: true });
    return res.status(200).json({
      errCode: 0,
      message: "Refresh token ok!",
      error: null,
      data: {
        token: accessToken,
        refreshToken: refreshTokenNew,
      },
    });
  } catch (error: any) {
    return res
      .status(401)
      .json(
        Helper.ResponseData(401, "Invalid refresh token", error.message, null)
      );
  }
};

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.params.page);
  let page = req.params.page ? parseInt(req.params.page) : null;
  // console.log(page);
  const keyword = req.query.keyword ? String(req.query.keyword) : null;
  const pageSize = Number(process.env.PAGE_SIZE || 10);
  try {
    const users = await CRUDUserService.getUsers(page, keyword, pageSize);
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      pageSize: pageSize,
      page: page === null ? null : page && page < 1 ? 1 : page,
      total: users.count,
      data: users.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await CRUDUserService.getUserById(id);
      return res.status(200).json({
        errCode: 0,
        message: "Find ok!",
        data: user,
      });
    }
    return res.status(500).json({
      errCode: 401,
      message: null,
      errors: "Error: Bad request!",
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const editUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, email, roleId, address, phone } = req.body;
    if (!id || !name || !email) {
      return res.status(404).json({
        errCode: 404,
        message: null,
        error: "Error: Bad request!",
      });
    }

    const user = await CRUDUserService.updateUser(
      id,
      name,
      email,
      roleId,
      address,
      phone
    );
    return res.status(200).json({
      errCode: 0,
      message: "Updated!",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const deleteUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const ids: string[] | number[] = req.body;
    if (!ids || ids.length <= 0) {
      return res.status(400).json({
        errCode: 400,
        message: null,
        error: "Error: Bad request!",
      });
    }
    await CRUDUserService.deleteUsers(ids);
    return res.status(200).json({
      errCode: 0,
      message: "Delete success!",
      data: [],
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const checkEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const email: string = req.body.email;
    // console.log(req.body);
    if (!email) {
      return res.status(400).json({
        errCode: 400,
        message: null,
        error: "Error: Bad request!",
      });
    }
    const check = await CRUDUserService.checkEmailExist(email);
    return res.status(200).json({
      errCode: 0,
      message: "Find ok!",
      data: check,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const getAvatarByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // console.log(req.body);
    if (!email) {
      return res.status(400).json({
        errCode: 400,
        message: null,
        error: "Error: Bad request!",
      });
    }
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["avatar"],
    });
    if (user) {
      const imagesImagePath = path.join(__dirname, "../uploads", user.avatar);
      // console.log(imagesImagePath);
      return res.status(200).sendFile(imagesImagePath);
    }
    return res.status(400).json({
      errCode: 400,
      message: null,
      errors: "Not find avatar",
      data: [],
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

export default {
  register,
  userLogin,
  refreshToken,
  getUsers,
  getUserById,
  editUser,
  deleteUsers,
  checkEmail,
  createUser,
  getAvatarByEmail,
};
