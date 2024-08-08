import { DetailsPage } from "./details";
import { numberWithCommas } from "./format_population";

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
        this.backToTopElement({ bottom: "3em", right: "2em" });
        window.addEventListener("scroll", () =>
        {
            this.displayButtonOnScroll();
        });
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

    backToTopElement({ bottom, right })
    {
        const button = document.createElement("button");
        button.type = "button";
        button.id = "back_top";
        button.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path class="cls-1" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.707,9.707a1,1,0,0,1-1.414,0L13,8.414V18a1,1,0,0,1-2,0V8.414L8.707,10.707A1,1,0,1,1,7.293,9.293l4-4a1,1,0,0,1,1.414,0l4,4A1,1,0,0,1,16.707,10.707Z"/></svg>`
        button.style.bottom = bottom;
        button.style.right = right;
        button.style.display = 'none';

        button.addEventListener("click", this.scrollTopEvt, false);
        content.insertAdjacentElement("beforeend", button);
    }
    displayButtonOnScroll()
    {
        const btn = document.getElementById("back_top");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
        {
            btn.style.display = 'block';
        } else
        {
            btn.style.display = 'none';
        }
    }
    scrollTopEvt()
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
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
        console.log('url :>> ', url);
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
        content.innerHTML = '';
        this.backToTopElement({ bottom: "3em", right: "2em" });
        const clickedLink = evt.target.getAttribute('href').substring(1);
        const url = `https://restcountries.com/v3.1/region/${clickedLink}`;
        this.getData(url);
    }
}