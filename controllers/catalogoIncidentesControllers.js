import { check, validationResult } from "express-validator";
import { categorias } from "../queries/consult.js";
import {
  Usuario,
  Tickets,
  TicketHistory,
  Rols,
  Categoria,
} from "../model/index.js";

const catalogoHome = (req, res) => {
  res.render("catalogo/home", {
    pagina: "Catalogo Incidentes",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
  });
};

const crearTicket = async (req, res) => {
  if (req.user.rol !== "Administrador" && req.user.rol !== "Estándar") {
    return res.render("catalogo/home", {
      pagina: "Catalogo Incidentes",
      mensaje:
        "No tienes permisos para acceder a esta opción para crear ticket",
      user: req.user.nombre,
      barra: true,
      alerta: true,
    });
  }

  res.render("catalogo/crear-ticket", {
    pagina: "Crear Nuevo Ticket",
    user: req.user.nombre,
    csrfToken: req.csrfToken(),
    barra: true,
    categorias,
  });
};

const registrarTicket = async (req, res) => {
  const { categoria, email, asunto, ip, detalle, imagen } = req.body;
  //Validar
  await check("categoria")
    .isNumeric()
    .withMessage("Selecionar la categoria del problema ")
    .run(req);
  await check("email").isEmail().withMessage("Email es obligatorio").run(req);
  await check("asunto")
    .notEmpty()
    .withMessage("Campo Asunto es obligatoio")
    .isLength({ max: 100 })
    .withMessage("Asunto muy largo")
    .run(req);
  await check("ip").notEmpty().withMessage("IP es obligatorio").run(req);
  await check("detalle")
    .notEmpty()
    .withMessage("Campo Detalle Ticket es obligatorio")
    .isLength({ max: 500 })
    .withMessage("Detalle Ticket muy largo")
    .run(req);

  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      barra: true,
      categorias,
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
    });
  }

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Email del usuario no es valido" }],
      barra: true,
      categorias,
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
    });
  }

  //Solo los correcto estandar pra crear crear los tickets de reporte
  if (usuario.rol !== "Estándar") {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      categorias,
      barra: true,
      errores: [
        {
          msg: "Correo para la creación de tickets solo puede ser de un usuario de tipo Estándar",
        },
      ],
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
    });
  }

  //Solo los Administrador pueden crear tickets 
  if (req.user.rol === "Administrador") {
    if (req.user.email !== usuario.email) {
      res.render("template/mensaje", {
        pagina: "Creación de Ticket",
        mensaje: "Ticket creado correctamente",
        exit: true,
        barra: true,
        user: req.user.nombre,
      });
    }
  }
  // Solo los usuarios que sean estándar pueden crear tickets
  else if (req.user.email !== usuario.email) {
    return res.render("catalogo/crear-ticket", {
      pagina: "Crear Nuevo Ticket",
      csrfToken: req.csrfToken(),
      categorias,
      user: req.user.nombre,
      ticket: {
        categoria: parseInt(categoria),
        email,
        asunto,
        ip,
        detalle,
      },
      errores: [
        {
          msg: "Introduzca su correo correctamente, con el cual se creo su credenciales",
        },
      ],
      barra: true,
    });
  }

  //Crear los tickets
  const ticket = await Tickets.create({
    email,
    asunto,
    ip,
    detalle_ticket: detalle,
    usuarioId: usuario.id,
    categoriaId: parseInt(categoria),
    imagen,
  });

  // Selecionamos la columna especifica con attributes
  const rolUsuario = await Rols.findAll({ attributes: ["nombre"] });

  //Obtenr los datos de lo rol excepto el estándar y el administrador creando un nuevo array.
  const rolesDisponibles = rolUsuario
    .map((rol) => rol.nombre)
    .filter((nombre) => nombre !== "Estándar")
    .filter((nombre) => nombre !== "Administrador");

  // Buscar la categoria selecionada por id
  const seleccionarCategorias = await Categoria.findOne({
    where: { id: categoria },
  });

  //Obtener los datos de las categorias
  const catgoriasSeleccionada = {
    Dispositivos: rolesDisponibles[0],
    Impresoras: rolesDisponibles[1],
  };

  // Asignar rol por default
  let rolAsignado = rolesDisponibles[2];

  // Obtener los datos de las categorias y convertirlo en un array
  for (const [claveCategoria, rol] of Object.entries(catgoriasSeleccionada)) {
    //startsWith: compara si la cadena comienza con el texto especificado
    if (seleccionarCategorias.nombre.startsWith(claveCategoria)) {
      rolAsignado = rol;
      break;
    }
  }

  //Asignando el rol
  ticket.rol = rolAsignado;

  // Filtrar usuarios por el rol asignado
  const usuarios = await Usuario.findAll({
    where: { rol: rolAsignado },
  });

  // Verificar que haya usuarios con ese rol
  if (usuarios.length === 0) {
    return res.render("template/mensaje", {
      pagina: "Error en la creación de Ticket",
      mensaje: "No hay usuarios disponibles para este rol",
      exit: false,
    });
  }

  // Seleccionar un usuario aleatorio
  const usuarioAsignado = usuarios[Math.floor(Math.random() * usuarios.length)];

  // Guardar el historial del ticket con el usuario asignado aleatoriamente
  ticket.id_user_asignado = usuarioAsignado.nombre;
  await ticket.save();

  await TicketHistory.create({
    id_ticket: ticket.id,
    id_user_creador: req.user.nombre_usuario,
    id_user_asignado: usuarioAsignado.nombre,
  });

  res.render("template/mensaje", {
    pagina: "Creación de Ticket",
    mensaje: "Ticket creado correctamente",
    exit: true,
    barra: true,
    user: req.user.nombre,
  });
};

export { catalogoHome, crearTicket, registrarTicket };
