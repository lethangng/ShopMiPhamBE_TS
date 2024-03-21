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
const getProductBillById = (id, page, keyword, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(">>> check 3");
    try {
        const whereCondition = keyword
            ? {
                // Điều kiện tìm kiếm
                productId: {
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
            const productBills = yield models_1.Product_Bill.findAndCountAll({
                where: Object.assign({ billId: id }, whereCondition),
                limit: pageSize,
                offset,
                attributes: ["id", "billId", "productId", "quantity"],
            });
            return productBills;
        }
        else {
            // console.log(">>> check page null");
            // console.log(">>> check where", whereCondition);
            const productBills = yield models_1.Product_Bill.findAndCountAll({
                where: Object.assign({ billId: id }, whereCondition),
                attributes: ["id", "billId", "productId", "quantity"],
            });
            // console.log(">>> check:", productBills);
            return productBills;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const deleteProductBills = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield models_1.Product_Bill.destroy({
            where: {
                id: ids,
            },
        });
        if (result === 0) {
            throw new Error("Delete product bills fail!");
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = {
    getProductBillById,
    deleteProductBills,
};
//# sourceMappingURL=CRUDProductBill.services.js.map