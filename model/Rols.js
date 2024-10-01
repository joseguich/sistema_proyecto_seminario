import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Rols = db.define("rols", {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

export default Rols;
