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
const sequelize_1 = require("sequelize");
const models_1 = require("../db/models");
const getBills = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let startDate;
        let endDate;
        if (!month) {
            startDate = new Date(year, 0, 1);
            endDate = new Date(year, 11, 31);
        }
        else {
            startDate = new Date(year, month, 1);
            endDate = new Date(year, month, 31);
        }
        const bills = models_1.Bill.findAll({
            where: {
                purchaseDate: {
                    [sequelize_1.Op.gte]: startDate,
                    [sequelize_1.Op.lte]: endDate,
                },
            },
        });
        return bills;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getProductBills = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month, 31);
        const bills = yield models_1.Bill.findAll({
            where: {
                purchaseDate: {
                    [sequelize_1.Op.gte]: startDate,
                    [sequelize_1.Op.lte]: endDate,
                },
            },
            include: [
                {
                    model: models_1.Product_Bill,
                    include: [
                        {
                            model: models_1.Product,
                        },
                    ],
                },
            ],
            raw: true,
            nest: true,
        });
        // console.log("bills: ", bills);
        const productBills = [];
        bills.forEach((bill) => {
            productBills.push(bill.Product_Bills.Product);
        });
        // console.log(">>> check:", productBills);
        return productBills;
    }
    catch (error) {
        console.log("Error: ", error);
        throw new Error(error.message);
    }
});
const getListBills = (page, keyword, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereCondition = keyword
            ? {
                // Điều kiện tìm kiếm
                // Điều kiện tìm kiếm
                userId: {
                    [sequelize_1.Op.eq]: keyword,
                },
            }
            : {};
        if (page) {
            // console.log(">>> check page");
            if (page < 1)
                page = 1;
            // Vị trí bắt đầu truy vấn
            const offset = (page - 1) * pageSize;
            const bills = yield models_1.Bill.findAndCountAll({
                where: whereCondition,
                limit: pageSize,
                offset,
                attributes: ["id", "purchaseDate", "totalMoney", "userId"],
                // raw: true,
            });
            return bills;
        }
        else {
            const bills = yield models_1.Bill.findAndCountAll({
                where: whereCondition,
                attributes: ["id", "purchaseDate", "totalMoney", "userId"],
            });
            return bills;
        }
    }
    catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
});
const deleteBills = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(">>> check:", ids);
    try {
        const result = yield models_1.Bill.destroy({
            where: {
                id: ids,
            },
        });
        const resultProductBill = yield models_1.Product_Bill.destroy({
            where: {
                productId: ids,
            },
        });
        if (result === 0 || resultProductBill == 0) {
            throw new Error("Delete bills fail!");
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getBillById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bill = yield models_1.Bill.findByPk(id);
        if (!bill) {
            throw new Error("Bill not found!");
        }
        return bill;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = {
    getBills,
    getListBills,
    deleteBills,
    getBillById,
    getProductBills,
};
//# sourceMappingURL=CRUDBill.services.js.map