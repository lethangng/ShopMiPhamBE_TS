import { Request, Response } from "express";
import Helper from "../helpers/Helper";
import dotenv from "dotenv";
import CRUDProductServices from "../services/CRUDProduct.services";
dotenv.config();

import archiver from "archiver";
import fs from "fs";
import path from "path";

const getProducts = async (req: Request, res: Response): Promise<Response> => {
  // console.log(req.params.page);
  let page = req.params.page ? parseInt(req.params.page) : null;
  // console.log(page);
  const keyword = req.query.keyword ? String(req.query.keyword) : null;
  const pageSize = Number(process.env.PAGE_SIZE || 10);
  try {
    const products = await CRUDProductServices.getProducts(
      page,
      keyword,
      pageSize
    );
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      pageSize: pageSize,
      page: page === null ? null : page && page < 1 ? 1 : page,
      total: products.count,
      data: products.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (id) {
      const user = await CRUDProductServices.getProductById(id);
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
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const getImgById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // console.log(">>> check:", id);

  // Đường dẫn tới thư mục chứa các hình ảnh
  const imagesFolderPath = path.join(__dirname, "../uploads");
  // console.log(imagesFolderPath);

  // Tạo một tệp nén mới
  const zipFilePath = path.join(__dirname, "../uploads/images.zip");
  // console.log(zipFilePath);
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Mức nén cao nhất
  });

  // Bắt đầu tạo tệp nén
  archive.pipe(output);

  try {
    // Lọc danh sách các tệp theo tiêu chí cụ thể (trong ví dụ này, lọc các tệp JPG và PNG)
    const fileNames = await CRUDProductServices.getFileNameById(id);
    // console.log(">>> filename:", fileNames);
    const newName = fileNames.map((item) => {
      // console.log("item:", item.image);
      return item.image;
    });
    // console.log(newName);

    // Thêm các tệp đã lọc vào tệp nén
    newName.forEach((file) => {
      const filePath = path.join(imagesFolderPath, file);
      // archive.append(fs.createReadStream(filePath), { name: file });
      archive.file(filePath, { name: file });
    });

    // Kết thúc tạo tệp nén
    archive.finalize();
    // Ghi tệp nén vào response và gửi về phía người dùng
    res.attachment("images.zip");
    archive.pipe(res);
  } catch (err: any) {
    // console.log("Error: ", err);
    res.status(500).json({ error: err.message });
  }
};

const editProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description, importPrice, quantity, price, productTypeId } =
      req.body;
    const files = req.files as Express.Multer.File[];
    if (
      !id ||
      !name ||
      !description ||
      !importPrice ||
      !quantity ||
      !price ||
      !productTypeId
    ) {
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
    const fileOlds = await CRUDProductServices.getFileNameById(id);
    if (fileOlds && fileOlds.length > 0) {
      const imagesFolderPath = path.join(__dirname, "../uploads");
      fileOlds.forEach((files) => {
        if (files.image !== "add-product.jpg") {
          fs.unlink(`${imagesFolderPath}/${files.image}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    }

    const fileNames = files.map((file: Express.Multer.File) => {
      return file.filename;
    });

    const user = await CRUDProductServices.updateProduct(
      id,
      name,
      description,
      fileNames,
      importPrice,
      quantity,
      price,
      productTypeId
    );
    return res.status(200).json({
      errCode: 0,
      message: "Updated!",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const deleteProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const ids: string[] | number[] = req.body;
    if (!ids || ids.length <= 0) {
      return res.status(400).json({
        errCode: 400,
        message: null,
        error: "Error: Bad request!",
      });
    }
    await CRUDProductServices.deleteProducts(ids);
    return res.status(200).json({
      errCode: 0,
      message: "Delete success!",
      data: [],
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, importPrice, quantity, price, productTypeId } =
      req.body;
    const files = req.files as Express.Multer.File[];
    if (
      !name ||
      !description ||
      !importPrice ||
      !quantity ||
      !price ||
      !productTypeId
    ) {
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
    const fileNames = files.map((file: Express.Multer.File) => {
      return file.filename;
    });
    // console.log(fileNames);

    const user = await CRUDProductServices.createProduct(
      name,
      description,
      fileNames,
      importPrice,
      quantity,
      price,
      productTypeId
    );

    return res.status(201).json(Helper.ResponseData(0, "Created!", null, user));
    // return res.status(201).json(Helper.ResponseData(0, "Created!", null, null));
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const checkName = async (req: Request, res: Response): Promise<Response> => {
  try {
    const name: string = req.body.name;
    // console.log(req.body);
    if (!name) {
      return res.status(400).json({
        errCode: 400,
        message: null,
        error: "Error: Bad request!",
      });
    }
    const check = await CRUDProductServices.checkNameExist(name);
    return res.status(200).json({
      errCode: 0,
      message: "Find ok!",
      data: check,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProducts,
  checkName,
  getImgById,
};
