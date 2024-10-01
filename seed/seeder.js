import { exit, argv } from "node:process";
import { Categoria, Rols } from "../model/index.js";
import categorias from "./categoria..js";
import rols from "./rols.js";
import db from "../config/db.js";

const importarDatos = async () => {
  try {
    //Autenticar
    await db.authenticate();

    //Columna
    await db.sync();

    //Insertar los datos a la bade de datos.
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Rols.bulkCreate(rols),
    ]);

    console.log("Datos importado correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1); //Detiene la ejecución  si ocurre un error.
  }
};

const eliminarDatos = async () => {
  try {
    await db.sync({ force: true });

    console.log("Datos eliminados correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (argv[2] === "-i") {
  importarDatos();
}
if (argv[2] === "-e") {
  eliminarDatos();
}
