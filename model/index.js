import Usuario from "./Usuario.js";
import Tickets from "./Tickets.js";
import Categoria from "./Categoria.js";
import Rols from "./Rols.js";

//Relación de la tabla usuario.
Tickets.belongsTo(Usuario, { foreignKey: "usuarioId" });

//Relación de la tabla categoria.
Tickets.belongsTo(Categoria, { foreignKey: "categoriaId" });

//Relación de la tabla rol
Tickets.belongsTo(Rols, { foreignKey: "rolsId" });

export { Usuario, Tickets, Categoria, Rols };
