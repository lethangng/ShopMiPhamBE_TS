import { DataTypes, Model } from "sequelize";
import connection from "../../config/connectDB";

class ImageProduct extends Model {
  public id!: number;
  public productId!: number;
  public image!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ImageProduct.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    productId: {
      allowNull: true,
      type: DataTypes.BIGINT,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection.sequelize,
    underscored: false,
    // tableName: "imageproducts",
  }
);

export default ImageProduct;
