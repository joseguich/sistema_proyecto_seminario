import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Tickets = db.define("tickets", {
  id: {
    type: DataTypes.UUID(),
    defaultValue: DataTypes.UUIDV4,
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

  estatus: {
    type: DataTypes.ENUM("pendiente", "En proceso", "declinado", "resuelto"),
    defaultValue: "pendiente",
    allowNull: false,
  },

  imagen: DataTypes.STRING,
});

export default Tickets;
