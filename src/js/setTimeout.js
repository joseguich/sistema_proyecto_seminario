const errores = document.querySelector("#errores");
errores.classList.add("animate__animated", "animate__backInUp");
setTimeout(
  function () {
    if (errores) {
      errores.classList.add("hidden");
    }
  },
  5000,
  setTimeout(() => {
    errores.classList.add("animate__backOutRight");
  }, 4000)
);
