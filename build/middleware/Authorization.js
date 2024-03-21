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
const Helper_1 = __importDefault(require("../helpers/Helper"));
const Token_1 = __importDefault(require("../services/Token"));
const CRUDUserService_1 = __importDefault(require("../services/CRUDUserService"));
const authenticated = (req, res, next) => {
    var _a;
    // const token = req.cookies && req.cookies.token;
    // const token = req.headers.authorization;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res
            .status(400)
            .json(Helper_1.default.ResponseData(400, "Login please!", null, []));
    }
    try {
        const decoded = Token_1.default.decodeToken(token);
        res.locals.userId = decoded.userId;
        // req.userId = decoded.userId;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json(Helper_1.default.ResponseData(401, "Token expired", error.message, []));
        }
        return res
            .status(500)
            .json(Helper_1.default.ResponseData(500, "Error", error.message, []));
    }
};
const userRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId;
        // const userId = req.userId;
        const user = yield CRUDUserService_1.default.getUserById(userId);
        if (user.id !== 2) {
            return res
                .status(403)
                .json(Helper_1.default.ResponseData(403, "Forbidden", null, []));
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json(Helper_1.default.ResponseData(500, "Error", error, []));
    }
});
const adminRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const roleId = res.locals.roleId;
        const userId = res.locals.userId;
        const user = yield CRUDUserService_1.default.getUserById(userId);
        if (user.id !== 1) {
            return res
                .status(403)
                .json(Helper_1.default.ResponseData(403, "Forbidden", null, []));
        }
        res.locals.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json(Helper_1.default.ResponseData(500, "Error", error, []));
    }
});
exports.default = { userRole, adminRole, authenticated };
//# sourceMappingURL=Authorization.js.map