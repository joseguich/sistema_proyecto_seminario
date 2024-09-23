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

eval("__webpack_require__.r(__webpack_exports__);\nconst viewPass = document.querySelector(\"#view-pass\");\r\nconst inputPass = document.querySelector(\"#password\");\r\nconst viewConfirm = document.querySelector(\"#view-confirm\");\r\nconst inputConfirm = document.querySelector(\"#confirmar_password\");\r\nconsole.log(inputPass);\r\n\r\nfunction viewsPassword(input, pass) {\r\n  if (input.value === \"\") return;\r\n  const isPass = input.type === \"password\";\r\n  input.type = isPass ? \"text\" : \"password\";\r\n  pass.textContent = isPass ? \"🙈\" : \"👁\";\r\n}\r\nfunction checkPassEmpty(input, view) {\r\n  if (input.value.trim() === \"\") {\r\n    input.type = \"password\";\r\n    view.classList.add(\"hidden\");\r\n    view.textContent = \"👁\";\r\n  } else {\r\n    input.type = \"password\";\r\n    view.classList.remove(\"hidden\");\r\n    view.textContent = \"👁\";\r\n  }\r\n}\r\n\r\nviewPass.addEventListener(\"click\", () => viewsPassword(inputPass, viewPass));\r\nviewConfirm.addEventListener(\"click\", () =>\r\n  viewsPassword(inputConfirm, viewConfirm)\r\n);\r\n\r\ninputPass.addEventListener(\"input\", () => checkPassEmpty(inputPass, viewPass));\r\ninputConfirm.addEventListener(\"input\", () =>\r\n  checkPassEmpty(inputConfirm, viewConfirm)\r\n);\r\n\n\n//# sourceURL=webpack://microtech/./src/js/viewPass.js?");

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