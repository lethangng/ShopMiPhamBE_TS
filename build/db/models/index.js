"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProduct = exports.ProductType = exports.Product_Bill = exports.Product = exports.Cart = exports.Role = exports.Bill = exports.User = void 0;
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
const Bill_1 = __importDefault(require("./Bill"));
exports.Bill = Bill_1.default;
const Role_1 = __importDefault(require("./Role"));
exports.Role = Role_1.default;
const Cart_1 = __importDefault(require("./Cart"));
exports.Cart = Cart_1.default;
const Product_1 = __importDefault(require("./Product"));
exports.Product = Product_1.default;
const Product_Bill_1 = __importDefault(require("./Product_Bill"));
exports.Product_Bill = Product_Bill_1.default;
const ProductType_1 = __importDefault(require("./ProductType"));
exports.ProductType = ProductType_1.default;
const ImageProduct_1 = __importDefault(require("./ImageProduct"));
exports.ImageProduct = ImageProduct_1.default;
// Định nghĩa quan hệ: Một User có nhiều Bill
User_1.default.hasMany(Bill_1.default, { foreignKey: "userId" });
User_1.default.hasMany(Cart_1.default, { foreignKey: "userId" });
// Role
Role_1.default.hasMany(User_1.default, { foreignKey: "roleId" });
// Product
Product_1.default.hasMany(Cart_1.default, { foreignKey: "productId" });
Product_1.default.hasMany(Product_Bill_1.default, { foreignKey: "productId" });
Product_1.default.hasMany(ImageProduct_1.default, { foreignKey: "productId" });
// ProductType
ProductType_1.default.hasMany(Product_1.default, { foreignKey: "productTypeId" });
// Bill
Bill_1.default.hasMany(Product_Bill_1.default, { foreignKey: "billId" });
// Product_Bill
Product_Bill_1.default.belongsTo(Product_1.default, { foreignKey: "productId" });
//# sourceMappingURL=index.js.map