const catalogoHome = (req, res) => {
  res.render("catalogo/home", {
    pagina: "Catalogo Incidentes",
    barra: true,
  });
};

const aplicaciones = (req, res) => {
  res.render("catalogo/aplicaciones", {
    pagina: "Aplicaciones",
    barra: true,
  });
};

export { catalogoHome, aplicaciones };
