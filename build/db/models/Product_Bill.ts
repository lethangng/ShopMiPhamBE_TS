import { DataTypes, Model } from "sequelize";
import connection from "../../config/connectDB";
import Product from "./Product";
import Bill from "./Bill";

class Product_Bill extends Model {
  public id!: number;
  public billId!: number;
  public productId!: number;
  public quantity!: number;

  public readonly Product!: Product;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product_Bill.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    billId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    productId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    sequelize: connection.sequelize,
    underscored: false,
    // tableName: "Product_Bills",
  }
);

export default Product_Bill;
