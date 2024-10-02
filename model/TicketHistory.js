import { DataTypes } from "sequelize";
import db from "../config/db.js";

const TicketHistory = db.define("ticket_histories", {
  id_ticket: {
    type: DataTypes.NUMBER
  },

  id_user_creador: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  id_user_asignado: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  accion: {
    type: DataTypes.STRING(60),
    defaultValue: "Pendiente"
  },

  comentario: {
    type: DataTypes.TEXT,
    defaultValue: "No se ha agregado comentario"
  },

  fecha_actualizacion: {
    type: DataTypes.DATE,
  },

});

export default TicketHistory;