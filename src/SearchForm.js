import AbstractView from "./AbstractView";
import { DetailsPage } from "./details";

const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#searchForm");

export default class extends AbstractView
{
    constructor()
    {
        super();
    }
    initialize()
    {
        searchForm.addEventListener("submit", this.formSubmit.bind(this));
        searchInput.addEventListener("keyup", this.searchInputEvt);
    }

    searchInputEvt(evt)
    {
        evt.preventDefault();
        const filter = searchInput.value.toLowerCase();
        const articles = document.querySelectorAll("#content > article");
        for (let i = 0; i < articles.length; i++)
        {
            if (articles[i].id.indexOf(filter) > -1)
            {
                articles[i].style.display = "";
            } else
            {
                articles[i].style.display = "none";
            }
        }
    }
    async formSubmit(evt)
    {
        evt.preventDefault();
        const country = searchInput.value;
        searchForm.reset();
        history.pushState({}, '', location.pathname);
        const detailsPage = new DetailsPage(country);
        detailsPage.initialize();
    }
}