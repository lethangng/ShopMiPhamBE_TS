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
const Helper_1 = __importDefault(require("../helpers/Helper"));
const dotenv_1 = __importDefault(require("dotenv"));
const CRUDProduct_services_1 = __importDefault(require("../services/CRUDProduct.services"));
dotenv_1.default.config();
const archiver_1 = __importDefault(require("archiver"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.page);
    let page = req.params.page ? parseInt(req.params.page) : null;
    // console.log(page);
    const keyword = req.query.keyword ? String(req.query.keyword) : null;
    const pageSize = Number(process.env.PAGE_SIZE || 10);
    try {
        const products = yield CRUDProduct_services_1.default.getProducts(page, keyword, pageSize);
        return res.status(200).json({
            errCode: 0,
            message: "OK",
            pageSize: pageSize,
            page: page === null ? null : page && page < 1 ? 1 : page,
            total: products.count,
            data: products.rows,
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
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (id) {
            const user = yield CRUDProduct_services_1.default.getProductById(id);
            return res.status(200).json({
                errCode: 0,
                message: "Find ok!",
                data: user,
            });
        }
        return res.status(401).json({
            errCode: 401,
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
const getImgById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // console.log(">>> check:", id);
    // Đường dẫn tới thư mục chứa các hình ảnh
    const imagesFolderPath = path_1.default.join(__dirname, "../uploads");
    // console.log(imagesFolderPath);
    // Tạo một tệp nén mới
    const zipFilePath = path_1.default.join(__dirname, "../uploads/images.zip");
    // console.log(zipFilePath);
    const output = fs_1.default.createWriteStream(zipFilePath);
    const archive = (0, archiver_1.default)("zip", {
        zlib: { level: 9 }, // Mức nén cao nhất
    });
    // Bắt đầu tạo tệp nén
    archive.pipe(output);
    try {
        // Lọc danh sách các tệp theo tiêu chí cụ thể (trong ví dụ này, lọc các tệp JPG và PNG)
        const fileNames = yield CRUDProduct_services_1.default.getFileNameById(id);
        // console.log(">>> filename:", fileNames);
        const newName = fileNames.map((item) => {
            // console.log("item:", item.image);
            return item.image;
        });
        // console.log(newName);
        // Thêm các tệp đã lọc vào tệp nén
        newName.forEach((file) => {
            const filePath = path_1.default.join(imagesFolderPath, file);
            // archive.append(fs.createReadStream(filePath), { name: file });
            archive.file(filePath, { name: file });
        });
        // Kết thúc tạo tệp nén
        archive.finalize();
        // Ghi tệp nén vào response và gửi về phía người dùng
        res.attachment("images.zip");
        archive.pipe(res);
    }
    catch (err) {
        // console.log("Error: ", err);
        res.status(500).json({ error: err.message });
    }
});
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, importPrice, quantity, price, productTypeId } = req.body;
        const files = req.files;
        if (!id ||
            !name ||
            !description ||
            !importPrice ||
            !quantity ||
            !price ||
            !productTypeId) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        // Kiểm tra xem files có tồn tại hay không
        if (!files || files.length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        // Xóa file cũ nếu tồn tại
        const fileOlds = yield CRUDProduct_services_1.default.getFileNameById(id);
        if (fileOlds && fileOlds.length > 0) {
            const imagesFolderPath = path_1.default.join(__dirname, "../uploads");
            fileOlds.forEach((files) => {
                if (files.image !== "add-product.jpg") {
                    fs_1.default.unlink(`${imagesFolderPath}/${files.image}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            });
        }
        const fileNames = files.map((file) => {
            return file.filename;
        });
        const user = yield CRUDProduct_services_1.default.updateProduct(id, name, description, fileNames, importPrice, quantity, price, productTypeId);
        return res.status(200).json({
            errCode: 0,
            message: "Updated!",
            data: user,
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
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        if (!ids || ids.length <= 0) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        yield CRUDProduct_services_1.default.deleteProducts(ids);
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
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, importPrice, quantity, price, productTypeId } = req.body;
        const files = req.files;
        if (!name ||
            !description ||
            !importPrice ||
            !quantity ||
            !price ||
            !productTypeId) {
            return res.status(500).json({
                errCode: 500,
                message: null,
                error: "Bad request!",
                data: [],
            });
        }
        // Kiểm tra xem files có tồn tại hay không
        if (!files || files.length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        // console.log(files);
        const fileNames = files.map((file) => {
            return file.filename;
        });
        // console.log(fileNames);
        const user = yield CRUDProduct_services_1.default.createProduct(name, description, fileNames, importPrice, quantity, price, productTypeId);
        return res.status(201).json(Helper_1.default.ResponseData(0, "Created!", null, user));
        // return res.status(201).json(Helper.ResponseData(0, "Created!", null, null));
    }
    catch (error) {
        return res.status(500).json({
            errCode: 500,
            message: null,
            errors: error.message,
        });
    }
});
const checkName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        // console.log(req.body);
        if (!name) {
            return res.status(400).json({
                errCode: 400,
                message: null,
                error: "Error: Bad request!",
            });
        }
        const check = yield CRUDProduct_services_1.default.checkNameExist(name);
        return res.status(200).json({
            errCode: 0,
            message: "Find ok!",
            data: check,
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
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProducts,
    checkName,
    getImgById,
};
//# sourceMappingURL=ProductController.js.map