import * as css from './style.css'
import Region from './Region';
import SearchForm from './SearchForm';
import { HomePage } from './homepage';
import { Scroll } from './scroll';
import { ThemeSwitcher } from './theme';
import Page from './Page';
import PageView from './PageView';

new ThemeSwitcher();
const form = new SearchForm()

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");
const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, "(.+)") + "$");

const activeLinkEvt = (evt) =>
{
    document.querySelectorAll(".dropdown_wrapper > a").forEach(link =>
    {
        link.classList.remove("active");
        evt.target.classList.add('active');

    })
}

document.querySelectorAll(".dropdown_wrapper > a").forEach(link =>
{
    link.addEventListener("click", activeLinkEvt)
})


const navigateTo = url =>
{
    history.pushState({}, "", url);
    router();
}
const displaySpinner = () =>
{
    document.querySelector(".loading_container").style.display = '';
    document.querySelector(".loading_container").classList.remove("hidden");
}

const hideSpinner = () =>
{
    setTimeout(() =>
    {
        document.querySelector(".container").classList.add('visible');
        document.querySelector(".loading_container").style.display = 'none';
    }, 1000);
}

const getParams = match =>
{
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    return Object.fromEntries(keys.map((key, i) =>
    {
        return [key, values[i].replace(/-/g, " ")]
    }));
}

const router = async () =>
{
    displaySpinner();
    const routes = [
        { path: '/', view: HomePage },
        { path: '/africa', view: Region },
        { path: '/america', view: Region },
        { path: '/asia', view: Region },
        { path: '/europe', view: Region },
        { path: '/oceania', view: Region },
        // query string page
        { path: '/page', view: Page },
        { path: '/page/:country', view: PageView },
    ];
    const potentialMatches = routes.map(route =>
    {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    if (!match)
    {
        match = {
            route: routes[0],
            result: [location.pathname],
        }
    }
    const view = new match.route.view(getParams(match));
    document.getElementById("content").insertAdjacentHTML("beforeend", await view.getHtml());
    hideSpinner();
}

window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", async () =>
{
    window.addEventListener('load', () =>
    {
        document.querySelector(".dropdown_wrapper > a:first-of-type").classList.add("active");

    });
    window.scrollBy({ top: 20, left: 0, behavior: 'smooth' });
    form.initialize();

    document.body.addEventListener("click", evt =>
    {
        if (evt.target.matches("[data-link]"))
        {
            evt.preventDefault();
            const clickedLink = evt.target.href;
            navigateTo(clickedLink);
        }
    });

    searchForm.addEventListener('submit', evt =>
    {
        evt.preventDefault();
        const country = searchInput.value;
        searchForm.reset();
        const formatCountryName = countryName =>
        {
            if (/\s/g.test(countryName))
            {
                return countryName.replace(/\s+/g, '-');
            }
            return countryName;
        }
        const url = `/page?country=${formatCountryName(country).toLowerCase()}`;
        navigateTo(url)

    });
    router();

    searchForm.reset();

    const dropdownBtn = document.querySelector(".dropdown_btn");
    const scroll = new Scroll();

    const btn = document.getElementById("back_top");

    window.addEventListener("scroll", () =>
    {
        scroll.displayButtonOnScroll(btn);
    });
    dropdownBtn.addEventListener("click", function ()
    {
        dropdownBtn.classList.toggle("expanded");
        setTimeout(() =>
        {
            dropdownBtn.classList.remove("expanded");
        }, 30000);
    });
});

