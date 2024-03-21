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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const sequelize_1 = require("sequelize");
const getProducts = (page, keyword, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
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
            // console.log(">>> check page");
            if (page < 1)
                page = 1;
            // Vị trí bắt đầu truy vấn
            const offset = (page - 1) * pageSize;
            const products = yield models_1.Product.findAndCountAll({
                where: whereCondition,
                limit: pageSize,
                offset,
                attributes: [
                    "id",
                    "name",
                    "description",
                    "importPrice",
                    "quantity",
                    "price",
                    "productTypeId",
                ],
            });
            return products;
        }
        else {
            // console.log(">>> check page null");
            // console.log(">>> check where", whereCondition);
            const products = yield models_1.Product.findAndCountAll({
                where: whereCondition,
                attributes: [
                    "id",
                    "name",
                    "description",
                    "importPrice",
                    "quantity",
                    "price",
                    "productTypeId",
                ],
            });
            return products;
        }
    }
    catch (error) {
        throw Error(error.message);
    }
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.Product.findByPk(id, {
            attributes: [
                "id",
                "name",
                "description",
                "importPrice",
                "quantity",
                "price",
                "productTypeId",
            ],
        });
        if (!product) {
            throw Error("Product not found!");
        }
        return product;
    }
    catch (error) {
        throw Error(error.toString());
    }
});
const updateProduct = (id, name, description, fileNames, importPrice, quantity, price, productTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield models_1.Product.findByPk(id, {
            attributes: [
                "id",
                "name",
                "description",
                "importPrice",
                "quantity",
                "price",
                "productTypeId",
            ],
        });
        if (!product) {
            throw Error("Product not found!");
        }
        product.name = name;
        product.description = description;
        product.importPrice = importPrice;
        product.quantity = quantity;
        product.price = price;
        product.productTypeId = productTypeId;
        yield product.save();
        const listImgs = yield fileNames.map((item) => {
            return {
                productId: product.id,
                image: item,
            };
        });
        // Xóa các bản ghi có id là id cần sửa
        yield models_1.ImageProduct.destroy({
            where: {
                productId: product.id,
            },
        });
        // Tạo mới lại list image theo id
        yield models_1.ImageProduct.bulkCreate(listImgs);
        return product;
    }
    catch (error) {
        throw Error(error.message);
    }
});
const deleteProducts = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Product.destroy({
            where: {
                id: ids,
            },
        });
        if (result === 0) {
            throw Error("Delete products fail!");
        }
    }
    catch (error) {
        throw Error(error.message);
    }
});
// interface ItemPhoto {
//   productId: number;
//   image: string;
// }
const createProduct = (name, description, fileNames, importPrice, quantity, price, productTypeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkName = yield models_1.Product.findOne({
            where: { name },
        });
        if (checkName) {
            throw Error("Name product already exist!");
        }
        const product = yield models_1.Product.create({
            name,
            description,
            importPrice,
            quantity,
            price,
            productTypeId,
        });
        const listImgs = yield fileNames.map((item) => {
            return {
                productId: product.id,
                image: item,
            };
        });
        // console.log(listImgs);
        // Lưu list hình ảnh products vào ImageProduct
        yield models_1.ImageProduct.bulkCreate(listImgs);
        return product;
    }
    catch (error) {
        throw Error(error.message);
    }
});
const checkNameExist = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield models_1.Product.findOne({
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
const getFileNameById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileNames = yield models_1.ImageProduct.findAll({
            where: {
                productId: id,
            },
        });
        return fileNames;
    }
    catch (error) {
        throw Error(error.message);
    }
});
exports.default = {
    getProductById,
    updateProduct,
    getProducts,
    deleteProducts,
    createProduct,
    checkNameExist,
    getFileNameById,
};
//# sourceMappingURL=CRUDProduct.services.js.map