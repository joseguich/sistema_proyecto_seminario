import jwt from "jsonwebtoken";

const generarToken = () =>
  Math.random().toString(30).substring(2) + Date.now().toString(30);

// JsonWebToken
const generarJWT = (datos) =>
  jwt.sign(
    { id: datos.id, nombre: datos.nombre, rol: datos.rol },
    process.env.SECRET_KEY ?? "secret_key",
    {
      expiresIn: "2h",
    }
  );

//TOKEN PARA REMEMBER
const rememberToken = (datos, remember, dias) => {
  const expiresIn = remember ? dias : "1d";
  return jwt.sign(
    { id: datos.id, nombre: datos.nombre, rol: datos.rol },
    process.env.SECRET_KEY,
    { expiresIn }
  );
};

export { generarToken, generarJWT, rememberToken };
