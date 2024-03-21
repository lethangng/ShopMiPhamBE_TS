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
const validatorjs_1 = __importDefault(require("validatorjs"));
const Helper_1 = __importDefault(require("../../helpers/Helper"));
const User_1 = __importDefault(require("../../db/models/User"));
const registerValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const rules = {
            name: "required|string|max:35|min:5",
            email: "required|email",
            password: "required|min:8",
            confirmPassword: "required|same:password",
            address: "required|string",
            phone: "required|string",
        };
        const validate = new validatorjs_1.default(data, rules);
        if (validate.fails()) {
            return res
                .status(400)
                .json(Helper_1.default.ResponseData(400, "Bad request!", validate.errors, []));
        }
        const user = yield User_1.default.findOne({
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
                .json(Helper_1.default.ResponseData(400, "Bad request!", errorData, []));
        }
        next();
    }
    catch (error) {
        return res
            .status(500)
            .json(Helper_1.default.ResponseData(500, "Error", error.message, []));
    }
});
const createUserValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const rules = {
            name: "required|string|max:35|min:5",
            email: "required|email",
            password: "required|min:8",
            confirmPassword: "required|same:password",
            roleId: "required",
        };
        const validate = new validatorjs_1.default(data, rules);
        if (validate.fails()) {
            return res
                .status(400)
                .json(Helper_1.default.ResponseData(400, "Bad request!", validate.errors, []));
        }
        const user = yield User_1.default.findOne({
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
                .json(Helper_1.default.ResponseData(400, "Bad request!", errorData, []));
        }
        next();
    }
    catch (error) {
        return res
            .status(500)
            .json(Helper_1.default.ResponseData(500, "Error", error.message, []));
    }
});
exports.default = { registerValidator, createUserValidator };
//# sourceMappingURL=UserValidation.js.map