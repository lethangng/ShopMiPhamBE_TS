"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../../config/connectDB"));
class Bill extends sequelize_1.Model {
}
Bill.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    purchaseDate: {
        allowNull: true,
        type: sequelize_1.DataTypes.DATE,
    },
    totalMoney: {
        allowNull: true,
        type: sequelize_1.DataTypes.DOUBLE,
    },
    userId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
}, {
    timestamps: true,
    sequelize: connectDB_1.default.sequelize,
    underscored: false,
});
exports.default = Bill;
//# sourceMappingURL=Bill.js.map