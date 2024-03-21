import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connectDB";

class Role extends Model {
  public id!: number;
  public roleName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    roleName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: connection.sequelize,
    underscored: false,
  }
);

export default Role;
