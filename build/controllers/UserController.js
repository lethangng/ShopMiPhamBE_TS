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
const path_1 = __importDefault(require("path"));
const Helper_1 = __importDefault(require("../helpers/Helper"));
const Token_1 = __importDefault(require("../services/Token"));
const dotenv_1 = __importDefault(require("dotenv"));
const CRUDUserService_1 = __importDefault(require("../services/CRUDUserService"));
const User_1 = __importDefault(require("../db/models/User"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmPassword, phone, address } = req.body;
        if (!name ||
            !email ||
            !password ||
            !confirmPassword ||
            !phone ||
            !address) {
            return res.status(500).json({
                errCode: 500,
                message: null,
                error: "Bad request!",
                data: [],
            });
        }
        const user = yield CRUDUserService_1.default.register(name, email, password, confirmPassword, phone, address);
        return res
            .status(201)
            .json(Helper_1.default.ResponseData(0, "Rergiter ok!", null, user));
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield CRUDUserService_1.default.addUser(name, email, password, confirmPassword, roleId);
        return res.status(201).json(Helper_1.default.ResponseData(0, "Created!", null, user));
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield CRUDUserService_1.default.login(email, password);
        // console.log(user);
        const token = Token_1.default.createToken(user.id);
        const refreshToken = Token_1.default.refreshToken(user.id);
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
    }
    catch (error) {
        return res.status(400).json({
            errCode: 400,
            message: null,
            errors: error.message,
            data: [],
        });
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.body.refreshToken;
    // console.log(req.body);
    try {
        const decoded = Token_1.default.decodeRefreshToken(refreshToken);
        const userId = decoded.userId;
        // Tạo mới access token
        const accessToken = Token_1.default.createToken(userId);
        const refreshTokenNew = Token_1.default.refreshToken(userId);
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
    }
    catch (error) {
        return res
            .status(401)
            .json(Helper_1.default.ResponseData(401, "Invalid refresh token", error.message, null));
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.page);
    let page = req.params.page ? parseInt(req.params.page) : null;
    // console.log(page);
    const keyword = req.query.keyword ? String(req.query.keyword) : null;
    const pageSize = Number(process.env.PAGE_SIZE || 10);
    try {
        const users = yield CRUDUserService_1.default.getUsers(page, keyword, pageSize);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            pageSize: pageSize,
            page: page === null ? null : page && page < 1 ? 1 : page,
            total: users.count,
            data: users.rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const user = yield CRUDUserService_1.default.getUserById(id);
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
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield CRUDUserService_1.default.updateUser(id, name, email, roleId, address, phone);
        return res.status(200).json({
            errCode: 0,
            message: "Updated!",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        if (!ids || ids.length <= 0) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        yield CRUDUserService_1.default.deleteUsers(ids);
        return res.status(200).json({
            errCode: 0,
            message: "Delete success!",
            data: [],
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        // console.log(req.body);
        if (!email) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        const check = yield CRUDUserService_1.default.checkEmailExist(email);
        return res.status(200).json({
            errCode: 0,
            message: "Find ok!",
            data: check,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const getAvatarByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield User_1.default.findOne({
            where: {
                email: email,
            },
            attributes: ["avatar"],
        });
        if (user) {
            const imagesImagePath = path_1.default.join(__dirname, "../uploads", user.avatar);
            // console.log(imagesImagePath);
            return res.status(200).sendFile(imagesImagePath);
        }
        return res.status(400).json({
            errCode: 400,
            message: null,
            errors: "Not find avatar",
            data: [],
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
exports.default = {
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
//# sourceMappingURL=UserController.js.map