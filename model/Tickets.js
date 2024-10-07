import { DataTypes } from "sequelize";
import db from "../config/db.js";
import { generarIdIdentificacion } from "../helper/token.js";

const Tickets = db.define("tickets", {
  id: {
    type: DataTypes.INTEGER,
    defaultValue: generarIdIdentificacion,
    allowNull: false,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  asunto: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },

  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  detalle_ticket: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  rol: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  estatus: {
    type: DataTypes.ENUM("pendiente", "En proceso", "declinado", "resuelto"),
    defaultValue: "pendiente",
    allowNull: false,
  },
  id_user_asignado: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  imagen: DataTypes.STRING,
});

export default Tickets;
