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
const dotenv_1 = __importDefault(require("dotenv"));
const CRUDProductType_services_1 = __importDefault(require("../services/CRUDProductType.services"));
dotenv_1.default.config();
const getProductTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.page);
    let page = req.params.page ? parseInt(req.params.page) : null;
    // console.log(page);
    const keyword = req.query.keyword ? String(req.query.keyword) : null;
    const pageSize = Number(process.env.PAGE_SIZE || 10);
    try {
        const productTypes = yield CRUDProductType_services_1.default.getProductTypes(page, keyword, pageSize);
        // console.log(">>>>");
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            pageSize: pageSize,
            page: page === null ? null : page && page < 1 ? 1 : page,
            total: productTypes.count,
            data: productTypes.rows,
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
const getProductTypeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const productType = yield CRUDProductType_services_1.default.getProductTypeById(id);
            return res.status(200).json({
                errCode: 0,
                message: "Find ok!",
                data: productType,
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
const editProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        if (!id || !name || !description) {
            return res.status(404).json({
                errCode: 404,
                message: null,
                error: "Error: Bad request!",
            });
        }
        const productType = yield CRUDProductType_services_1.default.updateProductType(id, name, description);
        return res.status(200).json({
            errCode: 0,
            message: "Updated!",
            data: productType,
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
const deleteProductTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        if (!ids || ids.length <= 0) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        yield CRUDProductType_services_1.default.deleteProductTypes(ids);
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
const createProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(500).json({
                errCode: 500,
                message: null,
                error: "Bad request!",
                data: [],
            });
        }
        const user = yield CRUDProductType_services_1.default.createProductType(name, description);
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
const checkName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        // console.log(req.body);
        if (!name) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        const check = yield CRUDProductType_services_1.default.checkNameExist(name);
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
exports.default = {
    getProductTypes,
    getProductTypeById,
    editProductType,
    deleteProductTypes,
    createProductType,
    checkName,
};
//# sourceMappingURL=ProductTypeController.js.map