import Categoria from "./Categoria.js";

//Obtener datos Categorias de tickets
const [categorias] = await Promise.all([Categoria.findAll()]);

export { categorias };
