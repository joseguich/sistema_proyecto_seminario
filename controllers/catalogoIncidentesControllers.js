const catalogoHome = (req, res) => {
  console.log(req.user.nombre);
  res.render("catalogo/home", {
    pagina: "Catalogo Incidentes",
    csrfToken: req.csrfToken(),
    user: req.user.nombre,
    barra: true,
  });
};

const aplicaciones = (req, res) => {
  res.render("catalogo/aplicaciones", {
    pagina: "Aplicaciones",
    user: req.user.nombre,
    csrfToken: req.csrfToken(),
    barra: true,
  });
};

export { catalogoHome, aplicaciones };
