import express from "express";
import csrf from "csurf";
import cookieParser from "cookie-parser";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import catalogoIncidentes from "./routes/catoalgoIncidentesRoutes.js";
import db from "./config/db.js";

const app = express();

//port
const port = process.env.PORT ?? 8080;

//Archivo estatico
app.use(express.static("public"));

//Habilitar el body para obtener la informacion del html
app.use(express.urlencoded({ extended: true }));

//Cookie
app.use(cookieParser());

//CSURF
app.use(csrf({ cookie: true }));

app.set("view engine", "pug");
app.set("views", "./views");

try {
  await db.authenticate();
  console.log("Conexión correcta a la base de datos");

  await db.sync();
} catch (error) {
  console.log(`Error al conectar a la base de datos: ${error}`);
}

//Rounting
app.use("/auth", usuarioRoutes);
app.use("/", catalogoIncidentes);

app.listen(port, () => {
  console.log(`Corriendo en el servidor: http://localhost:${port}`);
});
