const errores = document.querySelector("#errores");
errores.classList.add("animate__animated", "animate__bounceIn");
setTimeout(
  function () {
    if (errores) {
      errores.classList.add("hidden");
    }
  },
  5000,
  setTimeout(() => {
    errores.classList.add("animate__fadeOut");
  }, 4000)
);
