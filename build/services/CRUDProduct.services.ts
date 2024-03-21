import { Product, ImageProduct } from "../db/models";
import { Op } from "sequelize";

const getProducts = async (
  page: number | null,
  keyword: string | null,
  pageSize: number
) => {
  try {
    const whereCondition = keyword
      ? {
          // Điều kiện tìm kiếm
          name: {
            [Op.like]: `%${keyword}%`,
          },
        }
      : {};
    if (page) {
      // console.log(">>> check page");
      if (page < 1) page = 1;
      // Vị trí bắt đầu truy vấn
      const offset = (page - 1) * pageSize;
      const products = await Product.findAndCountAll({
        where: whereCondition,
        limit: pageSize,
        offset,
        attributes: [
          "id",
          "name",
          "description",
          "importPrice",
          "quantity",
          "price",
          "productTypeId",
        ],
      });
      return products;
    } else {
      // console.log(">>> check page null");
      // console.log(">>> check where", whereCondition);
      const products = await Product.findAndCountAll({
        where: whereCondition,
        attributes: [
          "id",
          "name",
          "description",
          "importPrice",
          "quantity",
          "price",
          "productTypeId",
        ],
      });
      return products;
    }
  } catch (error: any) {
    throw Error(error.message);
  }
};

const getProductById = async (id: string) => {
  try {
    const product = await Product.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "importPrice",
        "quantity",
        "price",
        "productTypeId",
      ],
    });
    if (!product) {
      throw Error("Product not found!");
    }

    return product;
  } catch (error: any) {
    throw Error(error.toString());
  }
};

const updateProduct = async (
  id: string,
  name: string,
  description: string,
  fileNames: any[],
  importPrice: number,
  quantity: number,
  price: number,
  productTypeId: number
) => {
  try {
    const product = await Product.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "importPrice",
        "quantity",
        "price",
        "productTypeId",
      ],
    });

    if (!product) {
      throw Error("Product not found!");
    }

    product.name = name;
    product.description = description;
    product.importPrice = importPrice;
    product.quantity = quantity;
    product.price = price;
    product.productTypeId = productTypeId;
    await product.save();

    const listImgs = await fileNames.map((item) => {
      return {
        productId: product.id,
        image: item,
      };
    });

    // Xóa các bản ghi có id là id cần sửa
    await ImageProduct.destroy({
      where: {
        productId: product.id,
      },
    });

    // Tạo mới lại list image theo id
    await ImageProduct.bulkCreate(listImgs);

    return product;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const deleteProducts = async (ids: string[] | number[]) => {
  try {
    const result = await Product.destroy({
      where: {
        id: ids,
      },
    });
    if (result === 0) {
      throw Error("Delete products fail!");
    }
  } catch (error: any) {
    throw Error(error.message);
  }
};

// interface ItemPhoto {
//   productId: number;
//   image: string;
// }

const createProduct = async (
  name: string,
  description: string,
  fileNames: any[],
  importPrice: number,
  quantity: number,
  price: number,
  productTypeId: number
) => {
  try {
    const checkName = await Product.findOne({
      where: { name },
    });

    if (checkName) {
      throw Error("Name product already exist!");
    }

    const product = await Product.create({
      name,
      description,
      importPrice,
      quantity,
      price,
      productTypeId,
    });

    const listImgs = await fileNames.map((item) => {
      return {
        productId: product.id,
        image: item,
      };
    });
    // console.log(listImgs);

    // Lưu list hình ảnh products vào ImageProduct
    await ImageProduct.bulkCreate(listImgs);

    return product;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const checkNameExist = async (name: string) => {
  try {
    const check = await Product.findOne({
      where: {
        name,
      },
    });
    return check ? true : false;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const getFileNameById = async (id: string | number) => {
  try {
    const fileNames = await ImageProduct.findAll({
      where: {
        productId: id,
      },
    });
    return fileNames;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export default {
  getProductById,
  updateProduct,
  getProducts,
  deleteProducts,
  createProduct,
  checkNameExist,
  getFileNameById,
};
