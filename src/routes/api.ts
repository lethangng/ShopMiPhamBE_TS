import express, { Router } from "express";
import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";
import UserValidation from "../middleware/validation/UserValidation";
import Authorization from "../middleware/Authorization";
import ProductTypeController from "../controllers/ProductTypeController";
import ProductController from "../controllers/ProductController";

// Config upload file: đường dẫn lưu, tên file
import multer from "multer";
import BillController from "../controllers/BillController";
import ProductBillController from "../controllers/ProductBillController";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Lấy time hiện tại
    const extension = file.originalname.split(".").pop(); // Lấy phần mở rộng của file
    const newFilename = `${timestamp}.${extension}`;
    cb(null, newFilename);
  },
});
const upload = multer({ storage: storage });

const initAPIRole = (app: express.Application) => {
  const routerRole = Router();
  routerRole.get("/", Authorization.authenticated, RoleController.getRole);
  routerRole.get("/:id", RoleController.getRoleById);
  routerRole.post(
    "/create",
    Authorization.authenticated,
    Authorization.adminRole,
    RoleController.createRole
  );
  routerRole.put(
    "/update/:id",
    Authorization.authenticated,
    Authorization.adminRole,
    RoleController.updateRole
  );
  routerRole.delete(
    "/delete/:id",
    Authorization.authenticated,
    Authorization.adminRole,
    RoleController.deleteRole
  );

  return app.use("/api/v1/role", routerRole);
};

const initAPIProductType = (app: express.Application) => {
  const routerProductType = Router();
  // Get list product types
  routerProductType.get(
    "/product-types/:page",
    ProductTypeController.getProductTypes
  );

  // Get detail product type
  routerProductType.get(
    "/product-type/:id",
    ProductTypeController.getProductTypeById
  );

  // Create product type
  routerProductType.post(
    "/product-type",
    Authorization.authenticated,
    Authorization.adminRole,
    ProductTypeController.createProductType
  );

  // Update product type
  routerProductType.put(
    "/product-type/:id",
    Authorization.authenticated,
    Authorization.adminRole,
    ProductTypeController.editProductType
  );

  // Delete product type
  routerProductType.delete(
    "/product-types",
    Authorization.authenticated,
    Authorization.adminRole,
    ProductTypeController.deleteProductTypes
  );

  // Check name exsit product type
  routerProductType.post(
    "/product-type/check-name",
    ProductTypeController.checkName
  );

  return app.use("/api/v1", routerProductType);
};

const initAPIProduct = (app: express.Application) => {
  const routerProduct = Router();

  // Upload img
  routerProduct.get("/product/upload/:id", ProductController.getImgById);

  // Get list products
  routerProduct.get("/products/:page?", ProductController.getProducts);

  // Get detail product
  routerProduct.get("/product/:id", ProductController.getProductById);

  // Create product
  routerProduct.post(
    "/product",
    upload.array("images"),
    Authorization.authenticated,
    Authorization.adminRole,
    ProductController.createProduct
  );

  // Update product
  routerProduct.put(
    "/product/:id",
    upload.array("images"),
    Authorization.authenticated,
    Authorization.adminRole,
    ProductController.editProduct
  );

  // Delete products
  routerProduct.delete(
    "/products",
    Authorization.authenticated,
    Authorization.adminRole,
    ProductController.deleteProducts
  );

  // Check name product exsist
  routerProduct.post("/product/check-name", ProductController.checkName);

  return app.use("/api/v1", routerProduct);
};

// User routing
const initAPIUser = (app: express.Application) => {
  const routerUser = Router();
  // Đăng ký
  routerUser.post(
    "/user/signup",
    UserValidation.registerValidator,
    UserController.register
  );

  // Login
  routerUser.post("/user/login", UserController.userLogin);

  // Refresh token
  routerUser.post("/user/refresh-token", UserController.refreshToken);

  // Check email exsit
  routerUser.post("/user/check-email", UserController.checkEmail);

  // Get avatar by email
  routerUser.post("/user/info", UserController.getAvatarByEmail);

  // Create user
  routerUser.post(
    "/user/create",
    UserValidation.createUserValidator,
    UserController.createUser
  );

  // Get list users
  routerUser.get(
    "/users/:page?",
    Authorization.authenticated,
    Authorization.adminRole,
    UserController.getUsers
  );

  // Get user by id
  routerUser.get(
    "/user/:id?",
    Authorization.authenticated,
    Authorization.adminRole,
    UserController.getUserById
  );

  // Update user
  routerUser.put(
    "/user/:id?",
    Authorization.authenticated,
    Authorization.adminRole,
    UserController.editUser
  );

  // Delete user
  routerUser.delete(
    "/users",
    Authorization.authenticated,
    Authorization.adminRole,
    UserController.deleteUsers
  );

  return app.use("/api/v1", routerUser);
};

// Bill routing
const initAPIBill = (app: express.Application) => {
  const routerBill = Router();
  // Get bill chart by year
  routerBill.get(
    "/bill/:year?",
    Authorization.authenticated,
    Authorization.adminRole,
    BillController.getBillCharts
  );

  // Get bill chart by year
  routerBill.get(
    "/bill-revenue",
    // Authorization.authenticated,
    // Authorization.adminRole,
    BillController.getBillRevenueCharts
  );

  routerBill.get(
    "/bill/:month?/:year?",
    Authorization.authenticated,
    Authorization.adminRole,
    BillController.getTopProductCharts
  );

  // Get bill + product chart by month + year

  // Get bill
  routerBill.get(
    "/bills/:page?",
    Authorization.authenticated,
    Authorization.adminRole,
    BillController.getBills
  );

  // Delete bill
  routerBill.delete(
    "/bills",
    Authorization.authenticated,
    Authorization.adminRole,
    BillController.deleteBills
  );

  // Get detail bill by id
  routerBill.get(
    "/bill/detail/:id?/:page?",
    Authorization.authenticated,
    Authorization.adminRole,
    BillController.getBillDetailById
  );

  return app.use("/api/v1", routerBill);
};

// ProductBill routing
const initAPIProductBill = (app: express.Application) => {
  const routerBill = Router();

  // Delete bill
  routerBill.delete(
    "/product-bills",
    Authorization.authenticated,
    Authorization.adminRole,
    ProductBillController.deleteProductBills
  );

  return app.use("/api/v1", routerBill);
};

export default {
  initAPIRole,
  initAPIUser,
  initAPIProductType,
  initAPIProduct,
  initAPIBill,
  initAPIProductBill,
};
