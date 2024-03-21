import { Request, Response } from "express";
import CRUDProductBillServices from "../services/CRUDProductBill.services";

const deleteProductBills = async (
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
    await CRUDProductBillServices.deleteProductBills(ids);
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

export default {
  deleteProductBills,
};
