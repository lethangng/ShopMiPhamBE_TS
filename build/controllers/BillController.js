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
const CRUDBill_services_1 = __importDefault(require("../services/CRUDBill.services"));
const CRUDProductBill_services_1 = __importDefault(require("../services/CRUDProductBill.services"));
const getBillCharts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.params.year ? parseInt(req.params.year) : null;
    // console.log(req.params);
    if (!year || year <= 0) {
        return res.status(400).json({
            errCode: 400,
            message: null,
            error: "Error: Bad request!",
        });
    }
    try {
        // Lấy ra các hóa đơn trong năm
        const bills = yield CRUDBill_services_1.default.getBills(null, year);
        const charts = new Array(12).fill(0);
        bills.forEach((bill) => {
            const month = bill.purchaseDate.getMonth();
            charts[month]++;
        });
        // console.log(charts);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            errors: null,
            data: charts,
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
const getBillRevenueCharts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const month = req.query.month ? parseInt(req.query.month) : null;
    const year = req.query.year ? parseInt(req.query.year) : null;
    // console.log(req.params);
    if (month && month <= 0) {
        return res.status(400).json({
            errCode: 400,
            message: null,
            error: "Error: Bad request!",
        });
    }
    if (!year || year <= 0) {
        return res.status(400).json({
            errCode: 400,
            message: null,
            error: "Error: Bad request!",
        });
    }
    try {
        // Lấy ra các hóa đơn trong năm
        const bills = yield CRUDBill_services_1.default.getBills(month, year);
        const charts = month
            ? new Array(4).fill(0)
            : new Array(12).fill(0);
        if (!month) {
            // charts = new Array(12).fill(0);
            bills.forEach((bill) => {
                const month = bill.purchaseDate.getMonth();
                charts[month] += bill.totalMoney;
            });
        }
        else {
            // Lặp qua các hóa đơn và phân loại vào từng tuần
            bills.forEach((bill) => {
                const purchaseDate = bill.purchaseDate;
                // Tính toán tuần tương ứng với ngày mua hàng
                const weekNumber = Math.floor((purchaseDate.getDate() - 1) / 7);
                // Tính tổng tiền cho tuần đó
                charts[weekNumber] += bill.totalMoney;
            });
        }
        // console.log(charts);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            errors: null,
            data: charts,
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
const getBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.page);
    let page = req.params.page ? parseInt(req.params.page) : null;
    // console.log(page);
    const keyword = req.query.keyword ? String(req.query.keyword) : null;
    const pageSize = Number(process.env.PAGE_SIZE || 10);
    try {
        const productTypes = yield CRUDBill_services_1.default.getListBills(page, keyword, pageSize);
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
        console.log("Error: ", error);
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const deleteBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        if (!ids || ids.length <= 0) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        yield CRUDBill_services_1.default.deleteBills(ids);
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
const getBillById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const bill = yield CRUDBill_services_1.default.getBillById(id);
            return res.status(200).json({
                errCode: 0,
                message: "Find ok!",
                data: bill,
            });
        }
        return res.status(400).json({
            errCode: 400,
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
const getBillDetailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(id);
    let page = req.params.page ? parseInt(req.params.page) : null;
    // console.log(page);
    const keyword = req.query.keyword ? String(req.query.keyword) : null;
    const pageSize = Number(process.env.PAGE_SIZE || 10);
    try {
        if (id) {
            // console.log(">>>check 1");
            const productBill = yield CRUDProductBill_services_1.default.getProductBillById(id, page, keyword, pageSize);
            // console.log(">>>check 2");
            return res.status(200).json({
                errCode: 0,
                message: "OK",
                pageSize: pageSize,
                page: page === null ? null : page && page < 1 ? 1 : page,
                total: productBill.count,
                data: productBill.rows,
            });
        }
        return res.status(400).json({
            errCode: 400,
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
const getTopProductCharts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const month = req.params.month ? parseInt(req.params.month) : null;
    const year = req.params.year ? parseInt(req.params.year) : null;
    // console.log(req.params);
    if (!month || month <= 0 || !year || year <= 0) {
        return res.status(400).json({
            errCode: 400,
            message: null,
            error: "Error: Bad request!",
        });
    }
    try {
        // Lấy ra các hóa đơn trong tháng của năm đấy
        const bills = yield CRUDBill_services_1.default.getProductBills(month, year);
        // console.log(">>> check:", bills);
        // Lấy ra sản phẩm và số lượng tương ứng của sản phẩm trong tháng đấy
        const charts = [];
        bills.forEach((bill) => {
            // console.log(">>>", bill.productId);
            const existProductId = charts.find((chart) => chart.productId == bill.id);
            if (existProductId) {
                existProductId.count++;
            }
            else {
                charts.push({ productId: bill.id, name: bill.name, count: 1 });
            }
        });
        // Sắp xếp mảng charts theo thứ tự giảm dần của count
        charts.sort((a, b) => b.count - a.count);
        const top10ProductCharts = charts.slice(0, 10);
        // console.log(">>> check charts:", top10ProductCharts);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            errors: null,
            data: charts,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
exports.default = {
    getBillCharts,
    getBills,
    deleteBills,
    getBillById,
    getBillDetailById,
    getTopProductCharts,
    getBillRevenueCharts,
};
//# sourceMappingURL=BillController.js.map