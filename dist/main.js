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
const searchInput = document.querySelector("#search");
let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
let countries;
class HomePage {
  constructor() {
    this.backToTopElement({
      bottom: "3em",
      right: "2em"
    });
    this.initialize();
  }
  initialize() {
    document.getElementById("searchForm").addEventListener("submit", evt => {
      evt.preventDefault();
    });
    this.getData();
    this.searchCountry();
    window.addEventListener("scroll", () => {
      this.displayButtonOnScroll();
    });
  }
  addCards(arr) {
    arr.forEach(data => {
      this.createCard(data);
    });
  }
  createCard(data) {
    let html = `<article class="country_card" id=${data.name['common'].toLowerCase()}>
            <section>
                <h1>${data.name['common']}</h1>
                <p><span>population:</span> ${this.numberWithCommas(data.population)}</p>
                <p><span>region:</span> ${data.region}</p>
                <p><span>capital:</span> ${data.capital.join(", ")}</p>
            </section>
            <figure><img src=${data.flags['png']} alt="${data.flags['alt']}" loading="lazy"></figure>
        </article>`;
    content.insertAdjacentHTML("beforeend", html);
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  backToTopElement(_ref) {
    let {
      bottom,
      right
    } = _ref;
    const button = document.createElement("button");
    button.type = "button";
    button.id = "back_top";
    button.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path class="cls-1" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.707,9.707a1,1,0,0,1-1.414,0L13,8.414V18a1,1,0,0,1-2,0V8.414L8.707,10.707A1,1,0,1,1,7.293,9.293l4-4a1,1,0,0,1,1.414,0l4,4A1,1,0,0,1,16.707,10.707Z"/></svg>`;
    button.style.bottom = bottom;
    button.style.right = right;
    button.style.display = 'none';
    button.addEventListener("click", this.scrollTopEvt);
    content.insertAdjacentElement("beforeend", button);
  }
  displayButtonOnScroll() {
    const btn = document.getElementById("back_top");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  }
  scrollTopEvt() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  async getData() {
    const dataPromise = await fetch(url);
    const data = await dataPromise.json();
    data.sort(function (a, b) {
      return a.name['common'] > b.name['common'] ? 1 : -1;
    });
    countries = data;
    this.addCards(countries);
  }
  searchCountry() {
    searchInput.addEventListener("keyup", this.searchInputEvt);
  }
  searchInputEvt(evt) {
    evt.preventDefault();
    const filter = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll("#content > article");
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id.toLowerCase().indexOf(filter) > -1) {
        articles[i].style.display = "";
      } else {
        articles[i].style.display = "none";
      }
    }
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



const _ = new _theme__WEBPACK_IMPORTED_MODULE_1__.ThemeSwitcher();
const navLinks = document.querySelectorAll(".dropdown_wrapper > a");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('searchForm').reset();
  navLinks.forEach(link => {
    link.addEventListener("click", evt => {
      evt.preventDefault();
      console.log('evt.getAttribute(href) :>> ', evt.target.getAttribute('href'));
      const clickedLink = evt.target.getAttribute('href').substring(1);
      console.log('clickedLink :>> ', clickedLink);
    });
  });
  const dropdownBtn = document.querySelector(".dropdown_btn");
  const homepage = new _homepage__WEBPACK_IMPORTED_MODULE_2__.HomePage();
  setTimeout(() => {
    document.querySelector(".loading_container").classList.add("hidden");
    document.querySelector(".container").classList.add('visible');
  }, 2000);
  window.scrollBy({
    top: 20,
    left: 0,
    behavior: 'smooth'
  });
  dropdownBtn.addEventListener("click", function () {
    dropdownBtn.classList.toggle("expanded");
  });
});

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
    this.updateThemeOnHtml(currentThemeSetting);
    themeBtn.innerHTML = currentThemeSetting === "dark" ? lightHtml : darkHtml;
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

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=main.js.map