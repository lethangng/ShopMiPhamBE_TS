import { DataTypes, Model } from "sequelize";
import connection from "../../config/connectDB";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  // public listPhoto!: string[];
  public importPrice!: number;
  public quantity!: number;
  public price!: number;
  public productTypeId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    // listPhoto: {
    //   allowNull: true,
    //   type: DataTypes.TEXT,
    // },
    importPrice: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    quantity: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    productTypeId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: true,
    sequelize: connection.sequelize,
    underscored: false,
  }
);

export default Product;
