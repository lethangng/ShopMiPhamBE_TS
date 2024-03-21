"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../../config/connectDB"));
class ProductType extends sequelize_1.Model {
}
ProductType.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    timestamps: true,
    sequelize: connectDB_1.default.sequelize,
    underscored: false,
    // tableName: "producttypes",
});
exports.default = ProductType;
//# sourceMappingURL=ProductType.js.map