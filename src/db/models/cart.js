import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  },
  { timestamps: false }
);

export default Cart;
