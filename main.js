"use strict";
(self["webpackChunkrest_countries_api_main"] = self["webpackChunkrest_countries_api_main"] || []).push([["main"],{

/***/ "./src/homepage.js":
/*!*************************!*\
  !*** ./src/homepage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
const content = document.getElementById("content");
let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
class HomePage {
  constructor() {
    this.initialize();
  }
  initialize() {
    this.getData();
  }
  addCards(arr) {
    console.log('arr.length :>> ', arr.length);
    arr.forEach(data => {
      this.createCard(data);
    });
  }
  createCard(data) {
    let html = `<article class="country_card">
        <section>
            <h1>${data.name['common']}</h1>
            <p><span>population:</span> ${this.numberWithCommas(data.population)}</p>
            <p><span>region:</span> ${data.region}</p>
            <p><span>capital:</span> ${data.capital}</p>
        </section>
        <figure><img src=${data.flags['svg']} alt="countries flags image" loading="lazy"></figure>
        </article>`;
    content.insertAdjacentHTML("beforeend", html);
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  async getData() {
    const dataPromise = await fetch(url);
    const data = await dataPromise.json();
    this.addCards(data);
    // countries = data;

    // console.log('data :>> ', data);
    // console.log('countries.indexOf() :>> ', countries.indexOf(countries.name === "Kenya"));
    // return data;
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./theme */ "./src/theme.js");
/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./homepage */ "./src/homepage.js");



let countries;
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loading_container").classList.add("hidden");
    document.querySelector(".container").classList.add('visible');
  }, 2000);
  const homepage = new _homepage__WEBPACK_IMPORTED_MODULE_2__.HomePage();
});
document.addEventListener("DOMContentLoaded", () => {
  const _ = new _theme__WEBPACK_IMPORTED_MODULE_1__.ThemeSwitcher();
  const dropdownBtn = document.querySelector(".dropdown_btn");
  dropdownBtn.addEventListener("click", function () {
    dropdownBtn.classList.toggle("expanded");
  });
  getData();
});
async function getData() {
  const dataPromise = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags');
  const data = await dataPromise.json();
  countries = data;
  console.log('data :>> ', data);
  console.log('countries.indexOf() :>> ', countries.indexOf(countries.name === "Kenya"));
  return data;
}

/***/ }),

/***/ "./src/theme.js":
/*!**********************!*\
  !*** ./src/theme.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeSwitcher: () => (/* binding */ ThemeSwitcher)
/* harmony export */ });
/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
const darkHtml = `<img src="./assets/icons/moon_icon.png" alt="dark button icon"> dark mode`;
const lightHtml = `<img src="./assets/icons/sun_icon.png" alt="light button icon"> light mode`;
const themeBtn = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
function calcSettingThemeStr(_ref) {
  let {
    localStorageTheme,
    systemSettingDark
  } = _ref;
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}
let currentThemeSetting = calcSettingThemeStr({
  localStorageTheme: localStorageTheme,
  systemSettingDark: systemSettingDark
});
class ThemeSwitcher {
  constructor() {
    this.initialize();
  }
  initialize() {
    themeBtn.innerHTML = currentThemeSetting === "dark" ? lightHtml : darkHtml;
    this.updateThemeOnHtml(currentThemeSetting);
    themeBtn.addEventListener("click", this.handleToggleEvt.bind(this));
  }
  handleToggleEvt() {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    const aria = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
    themeBtn.innerHTML = newTheme === "dark" ? lightHtml : darkHtml;
    themeBtn.setAttribute("aria-label", aria);
    this.updateThemeOnHtml(newTheme);
    localStorage.setItem("theme", newTheme);
    currentThemeSetting = newTheme;
  }
  updateThemeOnHtml(theme) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/spinner.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/spinner.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.sk-cube-grid {
    width: 15vmin;
    height: 15vmin;
    margin: 100px auto;
}

.sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;

    background-color: cadetblue;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out ;
}

.sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {

    0%,
    70%,
    100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
    }

    35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
    }
}

@keyframes sk-cubeGridScaleDelay {

    0%,
    70%,
    100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
    }

    35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
    }
}`, "",{"version":3,"sources":["webpack://./src/spinner.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,UAAU;IACV,WAAW;;IAEX,2BAA2B;IAC3B,WAAW;IACX,kEAAkE;IAClE,2DAA2D;AAC/D;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,2BAA2B;IAC3B,mBAAmB;AACvB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,qBAAqB;AACzB;;AAEA;;IAEI;;;QAGI,mCAAmC;QACnC,2BAA2B;IAC/B;;IAEA;QACI,mCAAmC;QACnC,2BAA2B;IAC/B;AACJ;;AAEA;;IAEI;;;QAGI,mCAAmC;QACnC,2BAA2B;IAC/B;;IAEA;QACI,mCAAmC;QACnC,2BAA2B;IAC/B;AACJ","sourcesContent":[".sk-cube-grid {\n    width: 15vmin;\n    height: 15vmin;\n    margin: 100px auto;\n}\n\n.sk-cube-grid .sk-cube {\n    width: 33%;\n    height: 33%;\n\n    background-color: cadetblue;\n    float: left;\n    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;\n    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out ;\n}\n\n.sk-cube-grid .sk-cube1 {\n    -webkit-animation-delay: 0.2s;\n    animation-delay: 0.2s;\n}\n\n.sk-cube-grid .sk-cube2 {\n    -webkit-animation-delay: 0.3s;\n    animation-delay: 0.3s;\n}\n\n.sk-cube-grid .sk-cube3 {\n    -webkit-animation-delay: 0.4s;\n    animation-delay: 0.4s;\n}\n\n.sk-cube-grid .sk-cube4 {\n    -webkit-animation-delay: 0.1s;\n    animation-delay: 0.1s;\n}\n\n.sk-cube-grid .sk-cube5 {\n    -webkit-animation-delay: 0.2s;\n    animation-delay: 0.2s;\n}\n\n.sk-cube-grid .sk-cube6 {\n    -webkit-animation-delay: 0.3s;\n    animation-delay: 0.3s;\n}\n\n.sk-cube-grid .sk-cube7 {\n    -webkit-animation-delay: 0s;\n    animation-delay: 0s;\n}\n\n.sk-cube-grid .sk-cube8 {\n    -webkit-animation-delay: 0.1s;\n    animation-delay: 0.1s;\n}\n\n.sk-cube-grid .sk-cube9 {\n    -webkit-animation-delay: 0.2s;\n    animation-delay: 0.2s;\n}\n\n@-webkit-keyframes sk-cubeGridScaleDelay {\n\n    0%,\n    70%,\n    100% {\n        -webkit-transform: scale3D(1, 1, 1);\n        transform: scale3D(1, 1, 1);\n    }\n\n    35% {\n        -webkit-transform: scale3D(0, 0, 1);\n        transform: scale3D(0, 0, 1);\n    }\n}\n\n@keyframes sk-cubeGridScaleDelay {\n\n    0%,\n    70%,\n    100% {\n        -webkit-transform: scale3D(1, 1, 1);\n        transform: scale3D(1, 1, 1);\n    }\n\n    35% {\n        -webkit-transform: scale3D(0, 0, 1);\n        transform: scale3D(0, 0, 1);\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_spinner_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./spinner.css */ "./node_modules/css-loader/dist/cjs.js!./src/spinner.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap);"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_spinner_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    --white: hsl(0, 0%, 100%);
    --trs-duration: 300ms;
    --trs-timing: cubic-bezier(.46, .03, .52, .96);
    --brs-width: .35em;
    --loader-bgc: hsla(0, 0%, 0%, 0.8);
}

[data-theme="light"] {
    --bg-color: hsl(0, 0%, 94%);
    --ele-bg-color: var(--white);
    --txt-color: hsl(200, 15%, 8%);
    --ip-color: hsl(0, 0%, 52%);
    --bxs-color: hsl(0, 0%, 58%);
}

[data-theme="dark"] {
    --bg-color: hsl(207, 26%, 17%);
    --ele-bg-color: hsl(209, 23%, 22%);
    --txt-color: var(--white);
    --ip-color: var(--white);
    --bxs-color: hsl(210, 23%, 30%);
}

html {
    box-sizing: border-box;

}

*,
*::before,
*::after {
    margin: unset;
    padding: unset;
    box-sizing: inherit;
}

body {
    background-color: var(--bg-color);
    color: var(--txt-color);
    font-family: "Nunito Sans", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: var(--trs-duration) background-color var(--trs-timing), color var(--trs-duration) var(--trs-timing);
}

button,
input,
input::placeholder,
a {
    font-family: inherit;

}

li {
    list-style: none;
}

a {
    color: inherit;
    text-decoration: none;
}

button {
    color: inherit;
    cursor: pointer;
    border: none;
    background-color: inherit;
}

img {
    max-width: 100%;
    max-height: 100%;
}


.loading_container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    background-color: var(--ele-bg-color);
    z-index: 100;
    height: 100dvh;

}


.loading_container.hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0ms ease-in-out,
        opacity var(--trs-duration) var(--trs-timing);
}

.container {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0ms ease-in-out,
        opacity var(--trs-duration) var(--trs-timing);
}

.container.visible {
    visibility: visible;
    opacity: 1;
}

.header,
.main,
.wrapper {
    padding: 1.75em 1.15em;

}

.header {
    display: grid;
    background-color: var(--ele-bg-color);
    grid-template-columns: 2fr 1fr;
    place-content: center;
}

.header>h1 {
    font-weight: 800;
    font-size: 1em;
}

.header img {
    width: 23px;

}

.header>button {
    text-transform: capitalize;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.45em;
    font-size: 0.85rem;
    font-weight: 600;
}
.wrapper {
    padding-bottom: 0;
}
.form>.search_container {
    background-color: var(--ele-bg-color);
    display: flex;
    color: var(--ip-color);
    align-items: center;
    justify-content: center;
    height: 51px;
    padding-inline: 1.55em;
    gap: 1.1em;
    max-width: 36em;
    border-radius: var(--brs-width);
    margin-bottom: 2em;
}

.form>.search_container svg {
    color: cadetblue;
    width: 30px;
    flex: 0 1 30px;
}

.form>.search_container:has(> input:focus) {
    outline: 2px solid cadetblue;
    box-shadow: 0px 0px 10px cadetblue;
    transition: all var(--trs-duration) var(--trs-timing);
}

.form>.search_container input {
    background-color: inherit;
    color: inherit;
    border: none;
    height: 60%;
    font-size: 0.9rem;
    width: 75%;
    flex: 1 1 100%;

}

.form>.search_container input:focus {
    outline: transparent;
}
.filter_wrapper{
    position: relative;
}
.filter_wrapper button,
.filter_wrapper button+div {
    font-size: .88rem;
    background-color: var(--ele-bg-color);
    width: 14em;
    border-radius: var(--brs-width);
    padding: 1.1em .65em 1.1em 1.35em;
}

.filter_wrapper button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    margin-bottom: 0.5em;
}

.filter_wrapper button svg {
    width: 20px;
    rotate: 0deg;
    transition: rotate var(--trs-duration) var(--trs-timing);
}

.filter_wrapper button.expanded>svg {
    rotate: 180deg;
}

.filter_wrapper button+div {
    position: absolute;
    height: auto;
    max-height: 0px;
    max-width: 0px;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: max-height var(--trs-duration) var(--trs-timing) 40ms, visibility 0ms ease-in-out, opacity var(--trs-duration) var(--trs-timing) 40ms, max-width var(--trs-duration) var(--trs-timing);
}

.filter_wrapper button.expanded+div {
    visibility: visible;
    opacity: 1;
    max-height: 14em;
    max-width: 14em;
}

.filter_wrapper button+div a {
    display: block;
    margin-bottom: 0.65em;
    width: 100%;
}

.filter_wrapper button+div a:last-of-type {
    margin-bottom: 0;
}
.main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    justify-content: center;
    align-items: center;
    gap: 3em;
}
.country_card{
    display: flex;
    flex-direction: column;
    width: 87%;
    height: fit-content;
    max-width: 35em;
    margin: 0 auto;
    background-color: var(--ele-bg-color);
    border-radius: var(--brs-width);
}
.country_card > section{
    padding: 1.35em;
}
.country_card>section h1{
    font-weight: 800;
    margin-bottom: 0.65em;
}
.country_card>section p {
    font-weight: 300; 
    font-size: 0.9rem;
    text-transform: capitalize;
    margin-bottom: 0.45em;
}

.country_card>section p > span{
    font-weight: 600;
}
.country_card > figure{
    order: -1;
    border-top-left-radius: var(--brs-width);
    border-top-right-radius: var(--brs-width);
    height: 11em;
}
.country_card>figure img {
    object-fit: cover;
    border-radius: inherit;
    height: 100%;
    width: 100%;

}
@media only screen and (min-width: 800px) {

    .header,
    .main,
    .wrapper {
        padding: 1.5em 3.5em;

    }

    .header>h1 {
        font-size: 1.45rem;
    }

    .wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));

    }

    .wrapper>div {
        justify-self: right;
    }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');\n@import url('./spinner.css');\n\n:root {\n    --white: hsl(0, 0%, 100%);\n    --trs-duration: 300ms;\n    --trs-timing: cubic-bezier(.46, .03, .52, .96);\n    --brs-width: .35em;\n    --loader-bgc: hsla(0, 0%, 0%, 0.8);\n}\n\n[data-theme=\"light\"] {\n    --bg-color: hsl(0, 0%, 94%);\n    --ele-bg-color: var(--white);\n    --txt-color: hsl(200, 15%, 8%);\n    --ip-color: hsl(0, 0%, 52%);\n    --bxs-color: hsl(0, 0%, 58%);\n}\n\n[data-theme=\"dark\"] {\n    --bg-color: hsl(207, 26%, 17%);\n    --ele-bg-color: hsl(209, 23%, 22%);\n    --txt-color: var(--white);\n    --ip-color: var(--white);\n    --bxs-color: hsl(210, 23%, 30%);\n}\n\nhtml {\n    box-sizing: border-box;\n\n}\n\n*,\n*::before,\n*::after {\n    margin: unset;\n    padding: unset;\n    box-sizing: inherit;\n}\n\nbody {\n    background-color: var(--bg-color);\n    color: var(--txt-color);\n    font-family: \"Nunito Sans\", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    transition: var(--trs-duration) background-color var(--trs-timing), color var(--trs-duration) var(--trs-timing);\n}\n\nbutton,\ninput,\ninput::placeholder,\na {\n    font-family: inherit;\n\n}\n\nli {\n    list-style: none;\n}\n\na {\n    color: inherit;\n    text-decoration: none;\n}\n\nbutton {\n    color: inherit;\n    cursor: pointer;\n    border: none;\n    background-color: inherit;\n}\n\nimg {\n    max-width: 100%;\n    max-height: 100%;\n}\n\n\n.loading_container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: fixed;\n    inset: 0;\n    background-color: var(--ele-bg-color);\n    z-index: 100;\n    height: 100dvh;\n\n}\n\n\n.loading_container.hidden {\n    visibility: hidden;\n    opacity: 0;\n    transition: visibility 0ms ease-in-out,\n        opacity var(--trs-duration) var(--trs-timing);\n}\n\n.container {\n    opacity: 0;\n    visibility: hidden;\n    transition: visibility 0ms ease-in-out,\n        opacity var(--trs-duration) var(--trs-timing);\n}\n\n.container.visible {\n    visibility: visible;\n    opacity: 1;\n}\n\n.header,\n.main,\n.wrapper {\n    padding: 1.75em 1.15em;\n\n}\n\n.header {\n    display: grid;\n    background-color: var(--ele-bg-color);\n    grid-template-columns: 2fr 1fr;\n    place-content: center;\n}\n\n.header>h1 {\n    font-weight: 800;\n    font-size: 1em;\n}\n\n.header img {\n    width: 23px;\n\n}\n\n.header>button {\n    text-transform: capitalize;\n    display: flex;\n    align-items: center;\n    justify-content: end;\n    gap: 0.45em;\n    font-size: 0.85rem;\n    font-weight: 600;\n}\n.wrapper {\n    padding-bottom: 0;\n}\n.form>.search_container {\n    background-color: var(--ele-bg-color);\n    display: flex;\n    color: var(--ip-color);\n    align-items: center;\n    justify-content: center;\n    height: 51px;\n    padding-inline: 1.55em;\n    gap: 1.1em;\n    max-width: 36em;\n    border-radius: var(--brs-width);\n    margin-bottom: 2em;\n}\n\n.form>.search_container svg {\n    color: cadetblue;\n    width: 30px;\n    flex: 0 1 30px;\n}\n\n.form>.search_container:has(> input:focus) {\n    outline: 2px solid cadetblue;\n    box-shadow: 0px 0px 10px cadetblue;\n    transition: all var(--trs-duration) var(--trs-timing);\n}\n\n.form>.search_container input {\n    background-color: inherit;\n    color: inherit;\n    border: none;\n    height: 60%;\n    font-size: 0.9rem;\n    width: 75%;\n    flex: 1 1 100%;\n\n}\n\n.form>.search_container input:focus {\n    outline: transparent;\n}\n.filter_wrapper{\n    position: relative;\n}\n.filter_wrapper button,\n.filter_wrapper button+div {\n    font-size: .88rem;\n    background-color: var(--ele-bg-color);\n    width: 14em;\n    border-radius: var(--brs-width);\n    padding: 1.1em .65em 1.1em 1.35em;\n}\n\n.filter_wrapper button {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 1em;\n    margin-bottom: 0.5em;\n}\n\n.filter_wrapper button svg {\n    width: 20px;\n    rotate: 0deg;\n    transition: rotate var(--trs-duration) var(--trs-timing);\n}\n\n.filter_wrapper button.expanded>svg {\n    rotate: 180deg;\n}\n\n.filter_wrapper button+div {\n    position: absolute;\n    height: auto;\n    max-height: 0px;\n    max-width: 0px;\n    overflow: hidden;\n    visibility: hidden;\n    opacity: 0;\n    transition: max-height var(--trs-duration) var(--trs-timing) 40ms, visibility 0ms ease-in-out, opacity var(--trs-duration) var(--trs-timing) 40ms, max-width var(--trs-duration) var(--trs-timing);\n}\n\n.filter_wrapper button.expanded+div {\n    visibility: visible;\n    opacity: 1;\n    max-height: 14em;\n    max-width: 14em;\n}\n\n.filter_wrapper button+div a {\n    display: block;\n    margin-bottom: 0.65em;\n    width: 100%;\n}\n\n.filter_wrapper button+div a:last-of-type {\n    margin-bottom: 0;\n}\n.main {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    justify-content: center;\n    align-items: center;\n    gap: 3em;\n}\n.country_card{\n    display: flex;\n    flex-direction: column;\n    width: 87%;\n    height: fit-content;\n    max-width: 35em;\n    margin: 0 auto;\n    background-color: var(--ele-bg-color);\n    border-radius: var(--brs-width);\n}\n.country_card > section{\n    padding: 1.35em;\n}\n.country_card>section h1{\n    font-weight: 800;\n    margin-bottom: 0.65em;\n}\n.country_card>section p {\n    font-weight: 300; \n    font-size: 0.9rem;\n    text-transform: capitalize;\n    margin-bottom: 0.45em;\n}\n\n.country_card>section p > span{\n    font-weight: 600;\n}\n.country_card > figure{\n    order: -1;\n    border-top-left-radius: var(--brs-width);\n    border-top-right-radius: var(--brs-width);\n    height: 11em;\n}\n.country_card>figure img {\n    object-fit: cover;\n    border-radius: inherit;\n    height: 100%;\n    width: 100%;\n\n}\n@media only screen and (min-width: 800px) {\n\n    .header,\n    .main,\n    .wrapper {\n        padding: 1.5em 3.5em;\n\n    }\n\n    .header>h1 {\n        font-size: 1.45rem;\n    }\n\n    .wrapper {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));\n\n    }\n\n    .wrapper>div {\n        justify-self: right;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=main.js.map