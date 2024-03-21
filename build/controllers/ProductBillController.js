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
const CRUDProductBill_services_1 = __importDefault(require("../services/CRUDProductBill.services"));
const deleteProductBills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        if (!ids || ids.length <= 0) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        yield CRUDProductBill_services_1.default.deleteProductBills(ids);
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
exports.default = {
    deleteProductBills,
};
//# sourceMappingURL=ProductBillController.js.map