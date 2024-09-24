/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/viewPass.js":
/*!****************************!*\
  !*** ./src/js/viewPass.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nconst viewPass = document.querySelector(\"#view-pass\");\nconst inputPass = document.querySelector(\"#password\");\nconst viewConfirm = document.querySelector(\"#view-confirm\");\nconst inputConfirm = document.querySelector(\"#confirmar_password\");\n\nfunction viewsPassword(input, view) {\n  if (input.value === \"\") return;\n  const isPass = input.type === \"password\";\n  input.type = isPass ? \"text\" : \"password\";\n  view.textContent = isPass ? \"🙈\" : \"👁\";\n}\nfunction checkPassEmpty(input, view) {\n  if (input.value.trim() === \"\") {\n    input.type = \"password\";\n    view.classList.add(\"hidden\");\n    view.textContent = \"👁\";\n  } else {\n    input.type = \"password\";\n    view.classList.remove(\"hidden\");\n    view.textContent = \"👁\";\n  }\n}\n\nviewPass.addEventListener(\"click\", () => viewsPassword(inputPass, viewPass));\nviewConfirm.addEventListener(\"click\", () =>\n  viewsPassword(inputConfirm, viewConfirm)\n);\n\ninputPass.addEventListener(\"input\", () => checkPassEmpty(inputPass, viewPass));\ninputConfirm.addEventListener(\"input\", () =>\n  checkPassEmpty(inputConfirm, viewConfirm)\n);\n\n\n//# sourceURL=webpack://microtech/./src/js/viewPass.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/viewPass.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;