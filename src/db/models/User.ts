import { DataTypes, Model } from "sequelize";
import connection from "../../config/connectDB";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public phone!: string;
  public avatar!: string;
  public roleId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
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
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    address: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    roleId: {
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

export default User;
