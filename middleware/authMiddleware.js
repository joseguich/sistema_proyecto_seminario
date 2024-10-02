import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Usuario from "../model/Usuario.js";

const authenticateUser = async (req, res, next) => {
  const token = req.cookies._auth_token;

  if (!token) {
    return res.redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "PalavraSuperSecreta"
    );

    const user = await Usuario.findByPk(decoded.id);

    if (user.remember === null) {
      console.log("Token valido sin recomendar");
    } else {
      const isValidToken = await bcrypt.compare(token, user.remember);
      if (!isValidToken) {
        console.log("Token no es valido");
        return res.redirect("/auth/login");
      } else {
        console.log("Token es valido");
      }
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.clearCookie("_auth_token");
    res.redirect("/auth/login");
  }
};

export default authenticateUser;
 