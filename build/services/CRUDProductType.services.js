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
const ProductType_1 = __importDefault(require("../db/models/ProductType"));
const sequelize_1 = require("sequelize");
const getProductTypes = (page, keyword, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereCondition = keyword
            ? {
                // Điều kiện tìm kiếm
                name: {
                    [sequelize_1.Op.like]: `%${keyword}%`,
                },
            }
            : {};
        if (page) {
            if (page < 1)
                page = 1;
            // Vị trí bắt đầu truy vấn
            const offset = (page - 1) * pageSize;
            // console.log(">>>", ProductType);
            const productTypes = yield ProductType_1.default.findAndCountAll({
                where: whereCondition,
                limit: pageSize,
                offset,
            });
            // console.log(">>>", productTypes);
            return productTypes;
        }
        else {
            const productTypes = yield ProductType_1.default.findAndCountAll({
                where: whereCondition,
            });
            return productTypes;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getProductTypeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productType = yield ProductType_1.default.findByPk(id);
        if (!productType) {
            throw Error("Product Type not found!");
        }
        return productType;
    }
    catch (error) {
        throw Error(error.toString());
    }
});
const updateProductType = (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productType = yield ProductType_1.default.findByPk(id);
        if (!productType) {
            throw Error("ProductType not found!");
        }
        productType.name = name;
        productType.description = description;
        yield productType.save();
        return productType;
    }
    catch (error) {
        throw Error(error.message);
    }
});
const deleteProductTypes = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield ProductType_1.default.destroy({
            where: {
                id: ids,
            },
        });
        if (result === 0) {
            throw Error("Delete productTypes fail!");
        }
    }
    catch (error) {
        throw Error(error.message);
    }
});
const createProductType = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkName = yield ProductType_1.default.findOne({
            where: { name },
        });
        if (checkName) {
            throw Error("Name product type already exist!");
        }
        const productType = yield ProductType_1.default.create({
            name,
            description,
        });
        return productType;
    }
    catch (error) {
        throw Error(error.message);
    }
});
const checkNameExist = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield ProductType_1.default.findOne({
            where: {
                name,
            },
        });
        return check ? true : false;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.default = {
    getProductTypeById,
    updateProductType,
    getProductTypes,
    deleteProductTypes,
    createProductType,
    checkNameExist,
};
//# sourceMappingURL=CRUDProductType.services.js.map