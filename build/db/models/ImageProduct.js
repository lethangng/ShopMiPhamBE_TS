"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../../config/connectDB"));
class ImageProduct extends sequelize_1.Model {
}
ImageProduct.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    productId: {
        allowNull: true,
        type: sequelize_1.DataTypes.BIGINT,
    },
    image: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
    sequelize: connectDB_1.default.sequelize,
    underscored: false,
    // tableName: "imageproducts",
});
exports.default = ImageProduct;
//# sourceMappingURL=ImageProduct.js.map