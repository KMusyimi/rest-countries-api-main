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
  sortDataAlphabetically(arr) {
    arr.sort(function (a, b) {
      return a.name['common'] > b.name['common'] ? 1 : -1;
    });
  }
  formatCapital(data) {
    if (data.capital === undefined) {
      return 'has no capital';
    }
    return data.capital.join(', ');
  }
});

/***/ }),

/***/ "./src/Page.js":
/*!*********************!*\
  !*** ./src/Page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AbstractView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractView */ "./src/AbstractView.js");

const wrapper = document.querySelector(".wrapper");
const arrowLeft = `<svg viewBox="0 0 32 32" height="23px" width="23px"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-left"><line class="cls-1" x1="3" x2="29" y1="16" y2="16"/><line class="cls-1" x1="3" x2="7" y1="16" y2="11"/><line class="cls-1" x1="3" x2="7" y1="16" y2="21"/></g></svg>`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _AbstractView__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.params = this.getCountryParam();
  }
  async getHtml() {
    document.getElementById("content").classList.add("page");
    document.getElementById("content").innerHTML = '';
    this.setTitle(this.params);
    this.url = `https://restcountries.com/v3.1/name/${this.params}?fullText=true`;
    this.createBackBtn();
    const dataPromise = await this.getData(this.url);
    if (dataPromise.status === 404) {
      return `<article><h1>Country data is currently not available!</h1></article>`;
    }
    const html = await Promise.all(dataPromise.map(async data => {
      const lastKey = Object.keys(data.name['nativeName']).pop();
      const languages = Object.values(data.languages).join(', ');
      const bordersHtml = await this.getBordersHtml(data.borders);
      const tld = data => data.tld === undefined ? "No available data" : data.tld[0];
      return `
                <article class="country_details">
                    <section>
                        <header>
                            <h1 class='fw-800'>${data.name['common']}</h1>
                        </header>
                        <div class="details">
                            <p><span class="fw-600">native name:</span> ${data.name['nativeName'][lastKey]['common']}</p>
                            <p><span class="fw-600">population:</span> ${this.numberWithCommas(data.population)}</p>
                            <p><span class="fw-600">region:</span> ${data.region}</p>
                            <p><span class="fw-600">sub region:</span> ${data.subregion}</p>
                            <p><span class="fw-600">capital:</span> ${data.capital.join(', ')}</p>
                        </div>
                        <div class="details">
                            <p><span class="fw-600">top level domain:</span> <span class='tld'>${tld(data)}</span></p>
                            <p><span class="fw-600">currencies:</span> ${this.currencyName(data.currencies)}</p>
                            <p><span class="fw-600">languages:</span> ${languages}</p>
                        </div>
                        <div class="borders"><span class="fw-600">border countries:</span><div class='borders__wrapper'>${bordersHtml}</div></div>
                    </section >
                    <figure class="flag"><img src="${data.flags['svg']}" alt="${data.flags['alt']}" loading="lazy"></figure>
                </article >
            `;
    }));
    return html.join('');
  }
  getCountryParam() {
    const urlParams = new URLSearchParams(location.search);
    const param = urlParams.get('country');
    return param.replace(/-/g, " ");
  }
  async getBordersHtml(borders) {
    if (borders === undefined) {
      return '<div class="bxs-bd">No Border Countries</div>';
    }
    const bordersHtml = await Promise.all(borders.map(async border => {
      const data = await this.getBordersData(border);
      return `
                <li class="bxs-bd">
                    <a href="/page/${data.replace(/\s+/g, '-').toLowerCase()}" data-link>${data}</a>
                </li>`;
    }));
    return bordersHtml.join('');
  }
  createBackBtn() {
    const button = document.createElement("button");
    button.type = "button";
    button.id = 'back-btn';
    button.classList.add('bxs-bd');
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
  currencyName(obj) {
    const values = Object.values(obj);
    return values[0].name;
  }
  backBtnEvt() {
    history.back();
  }
});

/***/ }),

/***/ "./src/PageView.js":
/*!*************************!*\
  !*** ./src/PageView.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/Page.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _Page__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(param) {
    super();
    this.params = this.getCountryParam(param.country);
  }
  getCountryParam(param) {
    return param;
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
/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./homepage */ "./src/homepage.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class extends _homepage__WEBPACK_IMPORTED_MODULE_0__.HomePage {
  constructor() {
    super();
    this.region = location.pathname.substring(1);
    this.setTitle(this.region);
    this.url = `https://restcountries.com/v3.1/region/${this.region}`;
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
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#searchForm");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
  constructor() {
    // super();
  }
  initialize() {
    // searchForm.addEventListener("submit", this.formSubmit.bind(this));
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
});

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
  async getHtml() {
    document.getElementById("content").innerHTML = '';
    document.getElementById("content").classList.remove("page");
    const dataPromise = await this.getData(this.url);
    this.sortDataAlphabetically(dataPromise);
    return dataPromise.map(data => {
      const nameLowerCase = data.name['common'].replace(/\s+/g, '-').toLowerCase();
      return `<article id='${nameLowerCase}' class='country_card'>
                <section>
                    <h1 class="fw-800"><a id='country__link' href="/page/${nameLowerCase}" data-link>${data.name['common']}</a></h1>
                    <p><span class="fw-600">population:</span> ${this.numberWithCommas(data.population)}</p>
                    <p><span class="fw-600">region:</span> ${data.region}</p>
                    <p><span class="fw-600">capital:</span> ${this.formatCapital(data)}</p>
                </section>
                <figure><img src=${data.flags['png']} alt="${data.flags['alt']}" loading="lazy"></figure>
            </article>`;
    }).join('');
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
/* harmony import */ var _Region__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Region */ "./src/Region.js");
/* harmony import */ var _SearchForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchForm */ "./src/SearchForm.js");
/* harmony import */ var _homepage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./homepage */ "./src/homepage.js");
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scroll */ "./src/scroll.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./theme */ "./src/theme.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _PageView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PageView */ "./src/PageView.js");








new _theme__WEBPACK_IMPORTED_MODULE_5__.ThemeSwitcher();
const form = new _SearchForm__WEBPACK_IMPORTED_MODULE_2__["default"]();
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");
const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, "(.+)") + "$");
const activeLinkEvt = evt => {
  document.querySelectorAll(".dropdown_wrapper > a").forEach(link => {
    link.classList.remove("active");
    evt.target.classList.add('active');
  });
};
document.querySelectorAll(".dropdown_wrapper > a").forEach(link => {
  link.addEventListener("click", activeLinkEvt);
});
const navigateTo = url => {
  history.pushState({}, "", url);
  router();
};
const displaySpinner = () => {
  document.querySelector(".loading_container").style.display = '';
  document.querySelector(".loading_container").classList.remove("hidden");
};
const hideSpinner = () => {
  setTimeout(() => {
    document.querySelector(".container").classList.add('visible');
    document.querySelector(".loading_container").style.display = 'none';
  }, 1000);
};
const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i].replace(/-/g, " ")];
  }));
};
const router = async () => {
  displaySpinner();
  const routes = [{
    path: '/',
    view: _homepage__WEBPACK_IMPORTED_MODULE_3__.HomePage
  }, {
    path: '/africa',
    view: _Region__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    path: '/america',
    view: _Region__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    path: '/asia',
    view: _Region__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    path: '/europe',
    view: _Region__WEBPACK_IMPORTED_MODULE_1__["default"]
  }, {
    path: '/oceania',
    view: _Region__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  // query string page
  {
    path: '/page',
    view: _Page__WEBPACK_IMPORTED_MODULE_6__["default"]
  }, {
    path: '/page/:country',
    view: _PageView__WEBPACK_IMPORTED_MODULE_7__["default"]
  }];
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });
  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname]
    };
  }
  const view = new match.route.view(getParams(match));
  document.getElementById("content").insertAdjacentHTML("beforeend", await view.getHtml());
  hideSpinner();
};
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", async () => {
  window.addEventListener('load', () => {
    document.querySelector(".dropdown_wrapper > a:first-of-type").classList.add("active");
  });
  window.scrollBy({
    top: 20,
    left: 0,
    behavior: 'smooth'
  });
  form.initialize();
  document.body.addEventListener("click", evt => {
    if (evt.target.matches("[data-link]")) {
      evt.preventDefault();
      const clickedLink = evt.target.href;
      navigateTo(clickedLink);
    }
  });
  searchForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const country = searchInput.value;
    searchForm.reset();
    const formatCountryName = countryName => {
      if (/\s/g.test(countryName)) {
        return countryName.replace(/\s+/g, '-');
      }
      return countryName;
    };
    const url = `/page?country=${formatCountryName(country).toLowerCase()}`;
    navigateTo(url);
  });
  router();
  searchForm.reset();
  const dropdownBtn = document.querySelector(".dropdown_btn");
  const scroll = new _scroll__WEBPACK_IMPORTED_MODULE_4__.Scroll();
  const btn = document.getElementById("back_top");
  window.addEventListener("scroll", () => {
    scroll.displayButtonOnScroll(btn);
  });
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
  }
  displayButtonOnScroll(btn) {
    // console.log('btn :>> ', btn);

    // const btn = document.getElementById("back_top");
    // if (btn != null)
    // {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
    // }
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
    document.getElementById("content").appendChild(button);
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