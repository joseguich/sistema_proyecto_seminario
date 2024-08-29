const generarToken = () =>
  Math.random().toString(30).substring(2) + Date.now().toString(30);

export { generarToken };
