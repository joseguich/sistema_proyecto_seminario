import { Categoria, Rols, Tickets } from "../model/index.js";

//Obtener datos Categorias de tickets
const categorias = await Categoria.findAll();

// Obtener todos los datos de tickets
const tickets = await Tickets.findAll();

const rols = await Rols.findAll();

export { categorias, tickets, rols };
