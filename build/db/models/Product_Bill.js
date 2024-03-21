"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../../config/connectDB"));
class Product_Bill extends sequelize_1.Model {
}
Product_Bill.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    billId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    productId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    quantity: {
        allowNull: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: true,
    sequelize: connectDB_1.default.sequelize,
    underscored: false,
    // tableName: "Product_Bills",
});
exports.default = Product_Bill;
//# sourceMappingURL=Product_Bill.js.map