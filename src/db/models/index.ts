import User from "./User";
import Bill from "./Bill";
import Role from "./Role";
import Cart from "./Cart";
import Product from "./Product";
import Product_Bill from "./Product_Bill";
import ProductType from "./ProductType";
import ImageProduct from "./ImageProduct";

// Định nghĩa quan hệ: Một User có nhiều Bill
User.hasMany(Bill, { foreignKey: "userId" });
User.hasMany(Cart, { foreignKey: "userId" });

// Role
Role.hasMany(User, { foreignKey: "roleId" });

// Product
Product.hasMany(Cart, { foreignKey: "productId" });
Product.hasMany(Product_Bill, { foreignKey: "productId" });
Product.hasMany(ImageProduct, { foreignKey: "productId" });

// ProductType
ProductType.hasMany(Product, { foreignKey: "productTypeId" });

// Bill
Bill.hasMany(Product_Bill, { foreignKey: "billId" });

// Product_Bill
Product_Bill.belongsTo(Product, { foreignKey: "productId" });
// Product_Bill.belongsTo(Bill, { foreignKey: "billId" });

// Định nghĩa quan hệ: Một Post thuộc về một User
// Post.belongsTo(User, { as: "user", foreignKey: "userId" });

// Cách truy vấn trên 2 bảng
// Lấy danh sách Users và các Posts của mỗi User
// Truy vấn dữ liệu từ bảng User kèm theo các bản ghi trong bảng Order
// User.findAll({ include: Bill }).then((users) => {
//   users.forEach((user) => {
//     console.log(user.name);
//     // console.log(user.Bills); // Các bản ghi trong bảng Order được liên kết với User
//   });
// });

export {
  User,
  Bill,
  Role,
  Cart,
  Product,
  Product_Bill,
  ProductType,
  ImageProduct,
};
