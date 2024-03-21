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
const Role_1 = __importDefault(require("../db/models/Role"));
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.default.findAll();
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            data: roles,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: error.message,
            errors: error,
        });
    }
});
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roleName, active } = req.body;
        const create = yield Role_1.default.create({
            roleName,
        });
        return res.status(201).json({
            errCode: 0,
            message: "Created!",
            data: create,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: error.message,
            errors: error,
        });
    }
});
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { roleName } = req.body;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).json({
                errCode: 404,
                message: "Data Not Found",
                data: null,
            });
        }
        role.roleName = roleName;
        yield role.save();
        return res.status(200).json({
            errCode: 0,
            message: "Updated!",
            data: role,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: error.message,
            errors: error,
        });
    }
});
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield Role_1.default.findByPk(id);
        if (!role) {
            return res.status(404).json({
                errCode: 404,
                message: "Data Not Found",
                data: null,
            });
        }
        yield role.destroy();
        return res.status(200).json({
            errCode: 0,
            message: "Deleted!",
            data: null,
        });
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: error.message,
            errors: error,
        });
    }
});
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield Role_1.default.findByPk(id);
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
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: error.message,
            errors: error,
        });
    }
});
exports.default = { getRole, createRole, updateRole, deleteRole, getRoleById };
//# sourceMappingURL=RoleController.js.map