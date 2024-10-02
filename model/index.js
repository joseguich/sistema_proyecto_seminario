import Usuario from "./Usuario.js";
import Tickets from "./Tickets.js";
import Categoria from "./Categoria.js";
import Rols from "./Rols.js";
import TicketHistory from "./TicketHistory.js";

//Relación de la tabla usuario.
Tickets.belongsTo(Usuario, { foreignKey: "usuarioId" });

//Relación de la tabla categoria.
Tickets.belongsTo(Categoria, { foreignKey: "categoriaId" });

export { Usuario, Tickets, Categoria, Rols, TicketHistory };
