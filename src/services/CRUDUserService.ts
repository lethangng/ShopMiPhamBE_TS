import { User } from "../db/models";
import { Op } from "sequelize";
import PasswordHelper from "../helpers/PasswordHelper";

const getUsers = async (
  page: number | null,
  keyword: string | null,
  pageSize: number
) => {
  try {
    const whereCondition = keyword
      ? {
          // Điều kiện tìm kiếm
          email: {
            [Op.like]: `%${keyword}%`,
          },
        }
      : {};
    if (page) {
      // console.log(">>> check page");
      if (page < 1) page = 1;
      // Vị trí bắt đầu truy vấn
      const offset = (page - 1) * pageSize;
      const users = await User.findAndCountAll({
        where: whereCondition,
        limit: pageSize,
        offset,
        attributes: ["id", "name", "email", "phone", "address", "roleId"],
      });
      return users;
    } else {
      // console.log(">>> check page null");
      // console.log(">>> check where", whereCondition);
      const users = await User.findAndCountAll({
        where: whereCondition,
        attributes: ["id", "name", "email", "phone", "address", "roleId"],
      });
      return users;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "phone", "address", "roleId"],
    });
    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  roleId: number,
  address: string,
  phone: string
) => {
  try {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "phone", "address", "roleId"],
    });
    if (!user) {
      throw new Error("User not found!");
    }

    user.name = name;
    user.email = email;
    user.roleId = roleId;
    user.phone = phone;
    user.address = address;
    await user.save();

    return user;
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

const deleteUsers = async (ids: string[] | number[]) => {
  try {
    const result = await User.destroy({
      where: {
        id: ids,
      },
    });
    if (result === 0) {
      throw new Error("Delete users fail!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  phone: string,
  address: string
) => {
  try {
    const checkEmail = await User.findOne({
      where: { email: email },
    });

    if (checkEmail) {
      throw new Error("Email already exist!");
    }

    const handPassword = await PasswordHelper.handPassword(password);
    const user = await User.create({
      name,
      email,
      password: handPassword,
      phone,
      address,
      roleId: 2,
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    // console.log(user);

    if (!user) {
      throw new Error("Email or password not exist!");
    }

    const checkPassword = await PasswordHelper.comparePassword(
      password,
      user.password
    );
    if (!checkPassword) {
      throw new Error("Email or password not exist!");
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const addUser = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  roleId: string
) => {
  try {
    const checkEmail = await User.findOne({
      where: { email: email },
    });

    if (checkEmail) {
      throw new Error("Email already exist!");
    }

    const handPassword = await PasswordHelper.handPassword(password);
    const user = await User.create({
      name,
      email,
      password: handPassword,
      roleId,
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const checkEmailExist = async (email: string) => {
  try {
    const check = await User.findOne({
      where: {
        email,
      },
    });
    return check ? true : false;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default {
  getUserById,
  updateUser,
  getUsers,
  deleteUsers,
  register,
  login,
  checkEmailExist,
  addUser,
};
