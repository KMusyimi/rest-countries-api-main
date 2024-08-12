import { DetailsPage } from "./details";
import { numberWithCommas } from "./format_population";
import { Scroll } from './scroll';

const scroll = new Scroll();


const content = document.getElementById("content");
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#searchForm");
const navLinks = document.querySelectorAll(".dropdown_wrapper > a");


let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';

export class HomePage
{
    constructor()
    {
        this.initialize();
    }
    initialize()
    {

        searchForm.addEventListener("submit", this.formSubmit.bind(this));
        this.getData(url);
        this.searchInput();
        this.filterByRegion();
    }
    addCards(arr)
    {
        arr.forEach(data =>
        {
            this.createCard(data);
        });
    }
    createCard(data)
    {
        const article = document.createElement("article");
        if (data.capital === undefined)
        {
            data.capital = 'has no capital';
        } else
        {
            data.capital = data.capital.join(', ');
        }

        let html = `
            <section>
                <h1 id="name" class="fw-800">${data.name['common']}</h1>
                <p><span class="fw-600">population:</span> ${numberWithCommas(data.population)}</p>
                <p><span class="fw-600">region:</span> ${data.region}</p>
                <p><span class="fw-600">capital:</span> ${data.capital}</p>
            </section>
            <figure><img src=${data.flags['png']} alt="${data.flags['alt']}" loading="lazy"></figure>
        `;
        article.id = data.name['common'].toLowerCase();
        article.className = "country_card";
        article.innerHTML = html;
        content.insertAdjacentElement("beforeend", article);
    }


    async getData(url)
    {
        const dataPromise = await fetch(url);
        const data = await dataPromise.json();
        data.sort(function (a, b)
        {
            return a.name['common'] > b.name['common'] ? 1 : -1;
        });
        this.addCards(data);
    }
    searchInput()
    {
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
    async individualItem(url)
    {
        const itemPromise = await fetch(url);
        const data = await itemPromise.json();
        return data;
    }

    async formSubmit(evt)
    {
        evt.preventDefault();
        const country = searchInput.value;
        const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
        const data = await this.individualItem(url);

        const detailsPage = new DetailsPage(data[0]);
    }
    // TODO: refactor code 
    filterByRegion()
    {
        navLinks.forEach(link =>
        {
            link.addEventListener("click", this.filterEvt.bind(this))
        });
    }
    filterEvt(evt)
    {
        evt.preventDefault();
        searchForm.reset();
        search.focus();
        content.innerHTML = '';
        scroll.backToTopButton({ bottom: "3em", right: "2em" });
        const clickedLink = evt.target.getAttribute('href').substring(1);
        const url = `https://restcountries.com/v3.1/region/${clickedLink}`;
        this.getData(url);
    }
}