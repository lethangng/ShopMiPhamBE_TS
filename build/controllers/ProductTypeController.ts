import { Request, Response } from "express";
import Helper from "../helpers/Helper";
import dotenv from "dotenv";
import CRUDProductTypeServices from "../services/CRUDProductType.services";
dotenv.config();

const getProductTypes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // console.log(req.params.page);
  let page = req.params.page ? parseInt(req.params.page) : null;
  // console.log(page);
  const keyword = req.query.keyword ? String(req.query.keyword) : null;
  const pageSize = Number(process.env.PAGE_SIZE || 10);
  try {
    const productTypes = await CRUDProductTypeServices.getProductTypes(
      page,
      keyword,
      pageSize
    );
    // console.log(">>>>");
    return res.status(200).json({
      errCode: 0,
      message: "OK",
      pageSize: pageSize,
      page: page === null ? null : page && page < 1 ? 1 : page,
      total: productTypes.count,
      data: productTypes.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const getProductTypeById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    if (id) {
      const productType = await CRUDProductTypeServices.getProductTypeById(id);
      return res.status(200).json({
        errCode: 0,
        message: "Find ok!",
        data: productType,
      });
    }
    return res.status(500).json({
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

const editProductType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id || !name || !description) {
      return res.status(404).json({
        errCode: 404,
        message: null,
        error: "Error: Bad request!",
      });
    }

    const productType = await CRUDProductTypeServices.updateProductType(
      id,
      name,
      description
    );
    return res.status(200).json({
      errCode: 0,
      message: "Updated!",
      data: productType,
    });
  } catch (error: any) {
    return res.status(500).json({
      errCode: 500,
      message: null,
      errors: error.message,
    });
  }
};

const deleteProductTypes = async (
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
    await CRUDProductTypeServices.deleteProductTypes(ids);
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

const createProductType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(500).json({
        errCode: 500,
        message: null,
        error: "Bad request!",
        data: [],
      });
    }
    const user = await CRUDProductTypeServices.createProductType(
      name,
      description
    );

    return res.status(201).json(Helper.ResponseData(0, "Created!", null, user));
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
    const check = await CRUDProductTypeServices.checkNameExist(name);
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
  getProductTypes,
  getProductTypeById,
  editProductType,
  deleteProductTypes,
  createProductType,
  checkName,
};
