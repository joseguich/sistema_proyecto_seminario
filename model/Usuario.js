import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const Usuario = db.define("usuario", {
  nombre_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
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

Usuario.prototype.verficarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default Usuario;
