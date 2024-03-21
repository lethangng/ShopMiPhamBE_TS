"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const sequelize_1 = require("sequelize");
const PasswordHelper_1 = __importDefault(require("../helpers/PasswordHelper"));
const getUsers = (page, keyword, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereCondition = keyword
            ? {
                // Điều kiện tìm kiếm
                email: {
                    [sequelize_1.Op.like]: `%${keyword}%`,
                },
            }
            : {};
        if (page) {
            // console.log(">>> check page");
            if (page < 1)
                page = 1;
            // Vị trí bắt đầu truy vấn
            const offset = (page - 1) * pageSize;
            const users = yield models_1.User.findAndCountAll({
                where: whereCondition,
                limit: pageSize,
                offset,
                attributes: ["id", "name", "email", "phone", "address", "roleId"],
            });
            return users;
        }
        else {
            // console.log(">>> check page null");
            // console.log(">>> check where", whereCondition);
            const users = yield models_1.User.findAndCountAll({
                where: whereCondition,
                attributes: ["id", "name", "email", "phone", "address", "roleId"],
            });
            return users;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByPk(id, {
            attributes: ["id", "name", "email", "phone", "address", "roleId"],
        });
        if (!user) {
            throw new Error("User not found!");
        }
        return user;
    }
    catch (error) {
        throw new Error(error.toString());
    }
});
const updateUser = (id, name, email, roleId, address, phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findByPk(id, {
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
        yield user.save();
        return user;
    }
    catch (error) {
        throw new Error(error.toString());
    }
});
const deleteUsers = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.User.destroy({
            where: {
                id: ids,
            },
        });
        if (result === 0) {
            throw new Error("Delete users fail!");
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const register = (name, email, password, confirmPassword, phone, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkEmail = yield models_1.User.findOne({
            where: { email: email },
        });
        if (checkEmail) {
            throw new Error("Email already exist!");
        }
        const handPassword = yield PasswordHelper_1.default.handPassword(password);
        const user = yield models_1.User.create({
            name,
            email,
            password: handPassword,
            phone,
            address,
            roleId: 2,
        });
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({
            where: {
                email: email,
            },
        });
        // console.log(user);
        if (!user) {
            throw new Error("Email or password not exist!");
        }
        const checkPassword = yield PasswordHelper_1.default.comparePassword(password, user.password);
        if (!checkPassword) {
            throw new Error("Email or password not exist!");
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const addUser = (name, email, password, confirmPassword, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkEmail = yield models_1.User.findOne({
            where: { email: email },
        });
        if (checkEmail) {
            throw new Error("Email already exist!");
        }
        const handPassword = yield PasswordHelper_1.default.handPassword(password);
        const user = yield models_1.User.create({
            name,
            email,
            password: handPassword,
            roleId,
        });
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const checkEmailExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield models_1.User.findOne({
            where: {
                email,
            },
        });
        return check ? true : false;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = {
    getUserById,
    updateUser,
    getUsers,
    deleteUsers,
    register,
    login,
    checkEmailExist,
    addUser,
};
//# sourceMappingURL=CRUDUserService.js.map