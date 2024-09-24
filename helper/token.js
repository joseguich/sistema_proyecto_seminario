import jwt from "jsonwebtoken";

const generarToken = () =>
  Math.random().toString(30).substring(2) + Date.now().toString(30);

// JsonWebToken
const generarJWT = (datos) =>
  jwt.sign(
    { id: datos.id, nombre: datos.nombre, rol: datos.rol },
    "Palabramuyperomuysecreta",
    {
      expiresIn: "2h",
    }
  );

export { generarToken, generarJWT };
