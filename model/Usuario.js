import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Usuario = db.define("usuario", {
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: { type: DataTypes.STRING, allowNull: false },

  password: { type: DataTypes.STRING, allowNull: false },

  rol: { type: DataTypes.STRING, allowNull: false },

  token: DataTypes.STRING,

  confirmacion: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Usuario;
