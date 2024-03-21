import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";
import Token from "../services/Token";
import CRUDUserService from "../services/CRUDUserService";

const authenticated = (req: Request, res: Response, next: NextFunction) => {
  // const token = req.cookies && req.cookies.token;
  // const token = req.headers.authorization;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json(Helper.ResponseData(400, "Login please!", null, []));
  }
  try {
    const decoded = Token.decodeToken(token);
    res.locals.userId = decoded.userId;
    // req.userId = decoded.userId;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(Helper.ResponseData(401, "Token expired", error.message, []));
    }
    return res
      .status(500)
      .json(Helper.ResponseData(500, "Error", error.message, []));
  }
};

const userRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.userId;
    // const userId = req.userId;

    const user = await CRUDUserService.getUserById(userId);
    if (user.id !== 2) {
      return res
        .status(403)
        .json(Helper.ResponseData(403, "Forbidden", null, []));
    }
    res.locals.user = user;
    next();
  } catch (error: any) {
    return res.status(500).json(Helper.ResponseData(500, "Error", error, []));
  }
};

const adminRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const roleId = res.locals.roleId;
    const userId = res.locals.userId;
    const user = await CRUDUserService.getUserById(userId);
    if (user.id !== 1) {
      return res
        .status(403)
        .json(Helper.ResponseData(403, "Forbidden", null, []));
    }
    res.locals.user = user;

    next();
  } catch (error: any) {
    return res.status(500).json(Helper.ResponseData(500, "Error", error, []));
  }
};

export default { userRole, adminRole, authenticated };
