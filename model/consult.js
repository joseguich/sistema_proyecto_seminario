import { Categoria, Tickets } from "./index.js";

//Obtener datos Categorias de tickets
const categorias = await Categoria.findAll();

// Obtener todos los datos de tickets
const tickets = await Tickets.findAll();

export { categorias, tickets };
