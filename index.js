import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

const app = express();

//port
const port = 3000;

//Archivo estatico
app.use(express.static("public"));

//Habilitar el body para obtener la informacion del html
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", "./views");

try {
  await db.authenticate();
  console.log("Conexión correcta a la base de datos");

  db.sync();
} catch (error) {
  console.log(`Error al conectar a la base de datos: ${error}`);
}

//Rounting
app.use("/auth", usuarioRoutes);

app.listen(port, () => {
  console.log(`Corriendo en el servidor: http://localhost:${port}`);
});
