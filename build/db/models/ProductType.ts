import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDB";

class ProductType extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductType.init(
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
  },
  {
    timestamps: true,
    sequelize: connection.sequelize,
    underscored: false,
    // tableName: "producttypes",
  }
);

export default ProductType;
