"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RoleController_1 = __importDefault(require("../controllers/RoleController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserValidation_1 = __importDefault(require("../middleware/validation/UserValidation"));
const Authorization_1 = __importDefault(require("../middleware/Authorization"));
const ProductTypeController_1 = __importDefault(require("../controllers/ProductTypeController"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
// Config upload file: đường dẫn lưu, tên file
const multer_1 = __importDefault(require("multer"));
const BillController_1 = __importDefault(require("../controllers/BillController"));
const ProductBillController_1 = __importDefault(require("../controllers/ProductBillController"));
const storage = multer_1.default.diskStorage({
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
const upload = (0, multer_1.default)({ storage: storage });
const initAPIRole = (app) => {
    const routerRole = (0, express_1.Router)();
    routerRole.get("/", Authorization_1.default.authenticated, RoleController_1.default.getRole);
    routerRole.get("/:id", RoleController_1.default.getRoleById);
    routerRole.post("/create", Authorization_1.default.authenticated, Authorization_1.default.adminRole, RoleController_1.default.createRole);
    routerRole.put("/update/:id", Authorization_1.default.authenticated, Authorization_1.default.adminRole, RoleController_1.default.updateRole);
    routerRole.delete("/delete/:id", Authorization_1.default.authenticated, Authorization_1.default.adminRole, RoleController_1.default.deleteRole);
    return app.use("/api/v1/role", routerRole);
};
const initAPIProductType = (app) => {
    const routerProductType = (0, express_1.Router)();
    // Get list product types
    routerProductType.get("/product-types/:page", ProductTypeController_1.default.getProductTypes);
    // Get detail product type
    routerProductType.get("/product-type/:id", ProductTypeController_1.default.getProductTypeById);
    // Create product type
    routerProductType.post("/product-type", Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductTypeController_1.default.createProductType);
    // Update product type
    routerProductType.put("/product-type/:id", Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductTypeController_1.default.editProductType);
    // Delete product type
    routerProductType.delete("/product-types", Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductTypeController_1.default.deleteProductTypes);
    // Check name exsit product type
    routerProductType.post("/product-type/check-name", ProductTypeController_1.default.checkName);
    return app.use("/api/v1", routerProductType);
};
const initAPIProduct = (app) => {
    const routerProduct = (0, express_1.Router)();
    // Upload img
    routerProduct.get("/product/upload/:id", ProductController_1.default.getImgById);
    // Get list products
    routerProduct.get("/products/:page?", ProductController_1.default.getProducts);
    // Get detail product
    routerProduct.get("/product/:id", ProductController_1.default.getProductById);
    // Create product
    routerProduct.post("/product", upload.array("images"), Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductController_1.default.createProduct);
    // Update product
    routerProduct.put("/product/:id", upload.array("images"), Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductController_1.default.editProduct);
    // Delete products
    routerProduct.delete("/products", Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductController_1.default.deleteProducts);
    // Check name product exsist
    routerProduct.post("/product/check-name", ProductController_1.default.checkName);
    return app.use("/api/v1", routerProduct);
};
// User routing
const initAPIUser = (app) => {
    const routerUser = (0, express_1.Router)();
    // Đăng ký
    routerUser.post("/user/signup", UserValidation_1.default.registerValidator, UserController_1.default.register);
    // Login
    routerUser.post("/user/login", UserController_1.default.userLogin);
    // Refresh token
    routerUser.post("/user/refresh-token", UserController_1.default.refreshToken);
    // Check email exsit
    routerUser.post("/user/check-email", UserController_1.default.checkEmail);
    // Get avatar by email
    routerUser.post("/user/info", UserController_1.default.getAvatarByEmail);
    // Create user
    routerUser.post("/user/create", UserValidation_1.default.createUserValidator, UserController_1.default.createUser);
    // Get list users
    routerUser.get("/users/:page?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, UserController_1.default.getUsers);
    // Get user by id
    routerUser.get("/user/:id?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, UserController_1.default.getUserById);
    // Update user
    routerUser.put("/user/:id?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, UserController_1.default.editUser);
    // Delete user
    routerUser.delete("/users", Authorization_1.default.authenticated, Authorization_1.default.adminRole, UserController_1.default.deleteUsers);
    return app.use("/api/v1", routerUser);
};
// Bill routing
const initAPIBill = (app) => {
    const routerBill = (0, express_1.Router)();
    // Get bill chart by year
    routerBill.get("/bill/:year?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, BillController_1.default.getBillCharts);
    // Get bill chart by year
    routerBill.get("/bill-revenue", 
    // Authorization.authenticated,
    // Authorization.adminRole,
    BillController_1.default.getBillRevenueCharts);
    routerBill.get("/bill/:month?/:year?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, BillController_1.default.getTopProductCharts);
    // Get bill + product chart by month + year
    // Get bill
    routerBill.get("/bills/:page?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, BillController_1.default.getBills);
    // Delete bill
    routerBill.delete("/bills", Authorization_1.default.authenticated, Authorization_1.default.adminRole, BillController_1.default.deleteBills);
    // Get detail bill by id
    routerBill.get("/bill/detail/:id?/:page?", Authorization_1.default.authenticated, Authorization_1.default.adminRole, BillController_1.default.getBillDetailById);
    return app.use("/api/v1", routerBill);
};
// ProductBill routing
const initAPIProductBill = (app) => {
    const routerBill = (0, express_1.Router)();
    // Delete bill
    routerBill.delete("/product-bills", Authorization_1.default.authenticated, Authorization_1.default.adminRole, ProductBillController_1.default.deleteProductBills);
    return app.use("/api/v1", routerBill);
};
exports.default = {
    initAPIRole,
    initAPIUser,
    initAPIProductType,
    initAPIProduct,
    initAPIBill,
    initAPIProductBill,
};
//# sourceMappingURL=api.js.map