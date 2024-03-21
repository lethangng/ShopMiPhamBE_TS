"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createToken = (userId) => {
    var _a;
    const token = jsonwebtoken_1.default.sign({ userId }, (_a = process.env.JWT_TOKEN) !== null && _a !== void 0 ? _a : "", {
        expiresIn: "15m",
        // expiresIn: "10s",
    });
    return token;
};
const refreshToken = (userId) => {
    var _a;
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, (_a = process.env.JWT_REFRESH_TOKEN) !== null && _a !== void 0 ? _a : "", {
        expiresIn: "7d",
    });
    return refreshToken;
};
const decodeRefreshToken = (refreshToken) => {
    var _a;
    return jsonwebtoken_1.default.verify(refreshToken, (_a = process.env.JWT_REFRESH_TOKEN) !== null && _a !== void 0 ? _a : "");
};
const decodeToken = (token) => {
    var _a;
    return jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_TOKEN) !== null && _a !== void 0 ? _a : "");
};
exports.default = { createToken, refreshToken, decodeRefreshToken, decodeToken };
//# sourceMappingURL=Token.js.map