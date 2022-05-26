import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define(
  "product",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 // Or DataTypes.UUIDV1
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    //timestamps: false,
    // freezeTableName:true
  }
);

export default Product;
