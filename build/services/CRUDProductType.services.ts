import ProductType from "../db/models/ProductType";
import { Op } from "sequelize";

const getProductTypes = async (
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
      if (page < 1) page = 1;
      // Vị trí bắt đầu truy vấn
      const offset = (page - 1) * pageSize;
      // console.log(">>>", ProductType);
      const productTypes = await ProductType.findAndCountAll({
        where: whereCondition,
        limit: pageSize,
        offset,
      });
      // console.log(">>>", productTypes);
      return productTypes;
    } else {
      const productTypes = await ProductType.findAndCountAll({
        where: whereCondition,
      });
      return productTypes;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getProductTypeById = async (id: string) => {
  try {
    const productType = await ProductType.findByPk(id);
    if (!productType) {
      throw Error("Product Type not found!");
    }

    return productType;
  } catch (error: any) {
    throw Error(error.toString());
  }
};

const updateProductType = async (
  id: string,
  name: string,
  description: string
) => {
  try {
    const productType = await ProductType.findByPk(id);
    if (!productType) {
      throw Error("ProductType not found!");
    }

    productType.name = name;
    productType.description = description;
    await productType.save();

    return productType;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const deleteProductTypes = async (ids: string[] | number[]) => {
  try {
    const result = await ProductType.destroy({
      where: {
        id: ids,
      },
    });
    if (result === 0) {
      throw Error("Delete productTypes fail!");
    }
  } catch (error: any) {
    throw Error(error.message);
  }
};

const createProductType = async (name: string, description: string) => {
  try {
    const checkName = await ProductType.findOne({
      where: { name },
    });

    if (checkName) {
      throw Error("Name product type already exist!");
    }

    const productType = await ProductType.create({
      name,
      description,
    });
    return productType;
  } catch (error: any) {
    throw Error(error.message);
  }
};

const checkNameExist = async (name: string) => {
  try {
    const check = await ProductType.findOne({
      where: {
        name,
      },
    });
    return check ? true : false;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export default {
  getProductTypeById,
  updateProductType,
  getProductTypes,
  deleteProductTypes,
  createProductType,
  checkNameExist,
};
