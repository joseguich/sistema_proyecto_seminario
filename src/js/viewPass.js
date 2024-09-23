const viewPass = document.querySelector("#view-pass");
const inputPass = document.querySelector("#password");
const viewConfirm = document.querySelector("#view-confirm");
const inputConfirm = document.querySelector("#confirmar_password");
console.log(inputPass);

function viewsPassword(input, pass) {
  if (input.value === "") return;
  const isPass = input.type === "password";
  input.type = isPass ? "text" : "password";
  pass.textContent = isPass ? "🙈" : "👁";
}
function checkPassEmpty(input, view) {
  if (input.value.trim() === "") {
    input.type = "password";
    view.classList.add("hidden");
    view.textContent = "👁";
  } else {
    input.type = "password";
    view.classList.remove("hidden");
    view.textContent = "👁";
  }
}

viewPass.addEventListener("click", () => viewsPassword(inputPass, viewPass));
viewConfirm.addEventListener("click", () =>
  viewsPassword(inputConfirm, viewConfirm)
);

inputPass.addEventListener("input", () => checkPassEmpty(inputPass, viewPass));
inputConfirm.addEventListener("input", () =>
  checkPassEmpty(inputConfirm, viewConfirm)
);
