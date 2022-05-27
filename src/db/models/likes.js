import sequelize from "../index.js";
import { DataTypes } from "sequelize";

const Like = sequelize.define(
  "like",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    timestamps: false
    // freezeTableName: true
  }
);

export default Like;
