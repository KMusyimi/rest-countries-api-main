import * as css from './style.css'
import SearchForm from './SearchForm';
import { ThemeSwitcher } from './theme';
import { HomePage } from './homepage';
import { Scroll } from './scroll';
import Region from './Region';

const _ = new ThemeSwitcher();
const form = new SearchForm();


const handleClickEvt = (evt) =>
{
    evt.preventDefault();
    document.querySelectorAll(".dropdown_wrapper > a").forEach(link =>
    {
        link.classList.remove('active');
    });
    evt.target.classList.add("active");
}


document.querySelectorAll(".dropdown_wrapper > a").forEach(link =>
{
    link.addEventListener("click", handleClickEvt);
});


const navigateTo = url =>
{
    history.pushState({}, "", url);
    router();
}

const router = async () =>
{
    const routes = [
        { path: '/', view: HomePage },
        { path: '/africa', view: Region },
        { path: '/america', view: Region },
        { path: '/asia', view: Region },
        { path: '/europe', view: Region },
        { path: '/oceania', view: Region },
    ]
    const potentialMatches = routes.map(route =>
    {
        return {
            route: route,
            isMatch: location.pathname == route.path
        }
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match)
    {
        match = {
            route: routes[0],
            isMatch: true,
        }
    }
    const view = new match.route.view();
    view.initialize();
}

window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", async () =>
{
    window.scrollBy({ top: 20, left: 0, behavior: 'smooth' });
    form.initialize();
    document.body.addEventListener("click", evt =>
    {
        if (evt.target.matches("[data-link]"))
        {
            evt.preventDefault();
            navigateTo(evt.target.href);
        }
    });

    router();
    document.getElementById('searchForm').reset();
    const dropdownBtn = document.querySelector(".dropdown_btn");
    const scroll = new Scroll();
    setTimeout(() =>
    {
        document.querySelector(".loading_container").classList.add("hidden");
        document.querySelector(".container").classList.add('visible');
        setTimeout(() =>
        {
            document.querySelector(".loading_container").style.display = 'none';
        }, 100);

    }, 1000);

    dropdownBtn.addEventListener("click", function ()
    {
        dropdownBtn.classList.toggle("expanded");
        setTimeout(() =>
        {
            dropdownBtn.classList.remove("expanded");
        }, 30000);
    });

});

