"use strict";
(self["webpackChunkrest_countries_api_main"] = self["webpackChunkrest_countries_api_main"] || []).push([["main"],{

/***/ "./src/AbstractView.js":
/*!*****************************!*\
  !*** ./src/AbstractView.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
  constructor() {}
  setTitle(title) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
    document.title = 'Rest Countries | ' + title;
  }
  async getHtml() {
    return ``;
  }
  async getData(url) {
    const fetchPromise = await fetch(url);
    return await fetchPromise.json();
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  setHtml(arr) {
    document.getElementById("content").innerHTML = '';
    this.sortDataAlphabetically(arr);
    arr.forEach(async data => {
      this.verifyCapital(data);
      let html = await this.getHtml(data);
      document.getElementById("content").insertAdjacentHTML('beforeend', html);
    });
  }
  sortDataAlphabetically(arr) {
    arr.sort(function (a, b) {
      return a.name['common'] > b.name['common'] ? 1 : -1;
    });
  }
  verifyCapital(data) {
    if (data.capital === undefined) {
      data.capital = 'has no capital';
    } else {
      data.capital = data.capital.join(', ');
    }
  }
  cardHtml(data) {
    return `
            <article id='${data.name['common'].toLowerCase()}' class='country_card'>
                <section>
                    <h1 id="name" class="fw-800">${data.name['common']}</h1>
                    <p><span class="fw-600">population:</span> ${this.numberWithCommas(data.population)}</p>
                    <p><span class="fw-600">region:</span> ${data.region}</p>
                    <p><span class="fw-600">capital:</span> ${data.capital}</p>
                </section>
                <figure><img src=${data.flags['png']} alt="${data.flags['alt']}" loading="lazy"></figure>
            </article>
            `;
  }
});

/***/ }),

/***/ "./src/Region.js":
/*!***********************!*\
  !*** ./src/Region.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/AbstractView.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.region = location.pathname.substring(1);
    this.setTitle(this.region);
    this.url = `https://restcountries.com/v3.1/region/${this.region}`;
  }
  async initialize() {
    const data = await this.getData(this.url);
    this.setHtml(data);
  }
  async getHtml(data) {
    return this.cardHtml(data);
  }
});

/***/ }),

/***/ "./src/SearchForm.js":
/*!***************************!*\
  !*** ./src/SearchForm.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/AbstractView.js");
/* harmony import */ var _details__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./details */ "./src/details.js");


const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#searchForm");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
  }
  initialize() {
    searchForm.addEventListener("submit", this.formSubmit.bind(this));
    searchInput.addEventListener("keyup", this.searchInputEvt);
  }
  searchInputEvt(evt) {
    evt.preventDefault();
    const filter = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll("#content > article");
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].id.indexOf(filter) > -1) {
        articles[i].style.display = "";
      } else {
        articles[i].style.display = "none";
      }
    }
  }
  async formSubmit(evt) {
    evt.preventDefault();
    const country = searchInput.value;
    searchForm.reset();
    history.pushState({}, '', location.pathname);
    const detailsPage = new _details__WEBPACK_IMPORTED_MODULE_1__.DetailsPage(country);
    detailsPage.initialize();
  }
});

/***/ }),

/***/ "./src/details.js":
/*!************************!*\
  !*** ./src/details.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DetailsPage: () => (/* binding */ DetailsPage)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/AbstractView.js");

const wrapper = document.querySelector(".wrapper");
const arrowLeft = `<svg viewBox="0 0 32 32" height="23px" width="23px"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-left"><line class="cls-1" x1="3" x2="29" y1="16" y2="16"/><line class="cls-1" x1="3" x2="7" y1="16" y2="11"/><line class="cls-1" x1="3" x2="7" y1="16" y2="21"/></g></svg>`;
class DetailsPage extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(country) {
    super();
    this.country = country;
    this.url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
    this.setTitle(country);
  }
  async initialize() {
    wrapper.style.display = 'none';
    const data = await this.getData(this.url);
    this.data = data[0];
    this.setHtml();
  }
  async setHtml() {
    document.getElementById("content").innerHTML = '';
    this.BackBtnElement();
    if (this.data === undefined) {
      const html = `
                <article>
                    <h1>Country does not exist!</h1>
                </article>`;
      document.getElementById("content").insertAdjacentHTML("beforeend", html);
      return;
    }
    const html = await this.getHtml();
    document.getElementById("content").insertAdjacentHTML('beforeend', html);
    this.populateBorders(this.data);
  }
  async getHtml() {
    const lastKey = Object.keys(this.data.name['nativeName']).pop();
    const languages = Object.values(this.data.languages).join(', ');
    return `
            <article class="country_details">
                <section>
                    <header>
                        <h1 class='fw-800'>${this.data.name['common']}</h1>
                    </header>
                    <div class="details">
                        <p><span class="fw-600">native name:</span> ${this.data.name['nativeName'][lastKey]['common']}</p>
                        <p><span class="fw-600">population:</span> ${this.numberWithCommas(this.data.population)}</p>
                        <p><span class="fw-600">region:</span> ${this.data.region}</p>
                        <p><span class="fw-600">sub region:</span> ${this.data.subregion}</p>
                        <p><span class="fw-600">capital:</span> ${this.data.capital.join(', ')}</p>
                    </div>
                    <div class="details">
                        <p><span class="fw-600">top level domain:</span> <span class='tld'>${this.data.tld[0]}</span></p>
                        <p><span class="fw-600">currencies:</span> ${this.currencyName(this.data.currencies)}</p>
                        <p><span class="fw-600">languages:</span> ${languages}</p>
                    </div>
                    <div class="borders"><span class="fw-600">border countries:</span><div class='borders__wrapper'></div></div>
                </section >
                <figure class="flag"><img src="${this.data.flags['svg']}" alt="${this.data.flags['alt']}" loading="lazy"></figure>
            </article >
        `;
  }
  BackBtnElement() {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add('back-btn', 'bxs-bd');
    button.innerText = "back";
    button.insertAdjacentHTML("afterbegin", arrowLeft);
    button.addEventListener("click", this.backBtnEvt);
    document.getElementById("content").insertAdjacentElement('afterbegin', button);
  }
  async getBordersData(country) {
    let url = `https://restcountries.com/v3.1/alpha?codes=${country.toLowerCase()}`;
    const data = await this.getData(url);
    return data[0].name['common'];
  }
  async populateBorders() {
    console.log('thisData :>> ', this.data);
    const borderWrapper = document.querySelector(".borders__wrapper");
    if (this.data.borders === undefined) {
      borderWrapper.insertAdjacentHTML('afterbegin', '<span class="bxs-bd">No Border Countries</span>');
      return;
    }
    this.data.borders.forEach(async country => {
      const el = await this.getBordersData(country);
      const html = `
                <li class="bxs-bd">
                    <a href="/${el.toLowerCase()}" data-link>${el}</a>
                </li>`;
      borderWrapper.insertAdjacentHTML("beforeend", html);
    });
  }
  currencyName(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const el = obj[key];
        return el.name;
      }
    }
  }
  backBtnEvt() {
    history.back();
    wrapper.style.display = '';
  }
}

/***/ }),

/***/ "./src/homepage.js":
/*!*************************!*\
  !*** ./src/homepage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomePage: () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/AbstractView.js");

let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
class HomePage extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.setTitle("Home");
    this.url = url;
  }
  async initialize() {
    const data = await this.getData(this.url);
    this.setHtml(data);
  }
  async getHtml(data) {
    return this.cardHtml(data);
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
/* harmony import */ var _SearchForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchForm */ "./src/SearchForm.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./theme */ "./src/theme.js");
/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./homepage */ "./src/homepage.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scroll */ "./src/scroll.js");
/* harmony import */ var _Region__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Region */ "./src/Region.js");






const _ = new _theme__WEBPACK_IMPORTED_MODULE_2__.ThemeSwitcher();
const form = new _SearchForm__WEBPACK_IMPORTED_MODULE_1__["default"]();
const handleClickEvt = evt => {
  evt.preventDefault();
  document.querySelectorAll(".dropdown_wrapper > a").forEach(link => {
    link.classList.remove('active');
  });
  evt.target.classList.add("active");
};
document.querySelectorAll(".dropdown_wrapper > a").forEach(link => {
  link.addEventListener("click", handleClickEvt);
});
const navigateTo = url => {
  history.pushState({}, "", url);
  router();
};
const router = async () => {
  const routes = [{
    path: '/',
    view: _homepage__WEBPACK_IMPORTED_MODULE_3__.HomePage
  }, {
    path: '/africa',
    view: _Region__WEBPACK_IMPORTED_MODULE_5__["default"]
  }, {
    path: '/america',
    view: _Region__WEBPACK_IMPORTED_MODULE_5__["default"]
  }, {
    path: '/asia',
    view: _Region__WEBPACK_IMPORTED_MODULE_5__["default"]
  }, {
    path: '/europe',
    view: _Region__WEBPACK_IMPORTED_MODULE_5__["default"]
  }, {
    path: '/oceania',
    view: _Region__WEBPACK_IMPORTED_MODULE_5__["default"]
  }];
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname == route.path
    };
  });
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  }
  const view = new match.route.view();
  view.initialize();
};
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", async () => {
  window.scrollBy({
    top: 20,
    left: 0,
    behavior: 'smooth'
  });
  form.initialize();
  document.body.addEventListener("click", evt => {
    if (evt.target.matches("[data-link]")) {
      evt.preventDefault();
      navigateTo(evt.target.href);
    }
  });
  router();
  document.getElementById('searchForm').reset();
  const dropdownBtn = document.querySelector(".dropdown_btn");
  const scroll = new _scroll__WEBPACK_IMPORTED_MODULE_4__.Scroll();
  setTimeout(() => {
    document.querySelector(".loading_container").classList.add("hidden");
    document.querySelector(".container").classList.add('visible');
    setTimeout(() => {
      document.querySelector(".loading_container").style.display = 'none';
    }, 100);
  }, 1000);
  dropdownBtn.addEventListener("click", function () {
    dropdownBtn.classList.toggle("expanded");
    setTimeout(() => {
      dropdownBtn.classList.remove("expanded");
    }, 30000);
  });
});

/***/ }),

/***/ "./src/scroll.js":
/*!***********************!*\
  !*** ./src/scroll.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Scroll: () => (/* binding */ Scroll)
/* harmony export */ });
class Scroll {
  constructor() {
    this.initialize();
  }
  initialize() {
    this.backToTopButton({
      bottom: "3em",
      right: "2em"
    });
    window.addEventListener("scroll", () => {
      this.displayButtonOnScroll();
    });
  }
  displayButtonOnScroll() {
    const btn = document.getElementById("back_top");
    if (btn != null) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    }
  }
  backToTopButton(_ref) {
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
    button.addEventListener("click", this.backToTopEvt, false);
    content.insertAdjacentElement("beforeend", button);
  }
  backToTopEvt() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
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