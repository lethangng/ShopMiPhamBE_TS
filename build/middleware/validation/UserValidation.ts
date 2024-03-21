import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import Helper from "../../helpers/Helper";
import User from "../../db/models/User";

const registerValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email, confirmPassword, address, phone } = req.body;
    // console.log(">>> check:", req.body);
    const data = {
      name,
      email,
      password,
      confirmPassword,
      address,
      phone,
    };
    const rules: Validator.Rules = {
      name: "required|string|max:35|min:5",
      email: "required|email",
      password: "required|min:8",
      confirmPassword: "required|same:password",
      address: "required|string",
      phone: "required|string",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .json(Helper.ResponseData(400, "Bad request!", validate.errors, []));
    }

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const errorData = {
        errors: {
          email: ["Email alread used!"],
        },
      };
      return res
        .status(400)
        .json(Helper.ResponseData(400, "Bad request!", errorData, []));
    }
    next();
  } catch (error: any) {
    return res
      .status(500)
      .json(Helper.ResponseData(500, "Error", error.message, []));
  }
};

const createUserValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email, confirmPassword, roleId } = req.body;
    // console.log(">>> check:", req.body);
    const data = {
      name,
      email,
      password,
      confirmPassword,
      roleId,
    };
    const rules: Validator.Rules = {
      name: "required|string|max:35|min:5",
      email: "required|email",
      password: "required|min:8",
      confirmPassword: "required|same:password",
      roleId: "required",
    };

    const validate = new Validator(data, rules);

    if (validate.fails()) {
      return res
        .status(400)
        .json(Helper.ResponseData(400, "Bad request!", validate.errors, []));
    }

    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const errorData = {
        errors: {
          email: ["Email alread used!"],
        },
      };
      return res
        .status(400)
        .json(Helper.ResponseData(400, "Bad request!", errorData, []));
    }
    next();
  } catch (error: any) {
    return res
      .status(500)
      .json(Helper.ResponseData(500, "Error", error.message, []));
  }
};

export default { registerValidator, createUserValidator };
