import { Product_Bill } from "../db/models";
import { Op } from "sequelize";

const getProductBillById = async (
  id: string,
  page: number | null,
  keyword: string | null,
  pageSize: number
) => {
  // console.log(">>> check 3");
  try {
    const whereCondition = keyword
      ? {
          // Điều kiện tìm kiếm
          productId: {
            [Op.like]: `%${keyword}%`,
          },
        }
      : {};
    if (page) {
      // console.log(">>> check page");
      if (page < 1) page = 1;
      // Vị trí bắt đầu truy vấn
      const offset = (page - 1) * pageSize;
      const productBills = await Product_Bill.findAndCountAll({
        where: {
          billId: id,
          ...whereCondition,
        },
        limit: pageSize,
        offset,
        attributes: ["id", "billId", "productId", "quantity"],
      });
      return productBills;
    } else {
      // console.log(">>> check page null");
      // console.log(">>> check where", whereCondition);
      const productBills = await Product_Bill.findAndCountAll({
        where: {
          billId: id,
          ...whereCondition,
        },
        attributes: ["id", "billId", "productId", "quantity"],
      });
      // console.log(">>> check:", productBills);
      return productBills;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteProductBills = async (ids: string[] | number[]) => {
  try {
    const result = await Product_Bill.destroy({
      where: {
        id: ids,
      },
    });
    if (result === 0) {
      throw new Error("Delete product bills fail!");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default {
  getProductBillById,
  deleteProductBills,
};
