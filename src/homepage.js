const content = document.getElementById("content");
const searchInput = document.querySelector("#search");
let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';

let countries;
export class HomePage
{
    constructor()
    {
        this.backToTopElement({ bottom: "3em", right: "2em" });
        this.initialize();
    }
    initialize()
    {
        document.getElementById("searchForm").addEventListener("submit", evt =>
        {
            evt.preventDefault();
        });
        this.getData();
        this.searchCountry();
        window.addEventListener("scroll", () =>
        {
            this.displayButtonOnScroll();
        });
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
    numberWithCommas(x)
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

        button.addEventListener("click", this.scrollTopEvt);
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
    async getData()
    {

        const dataPromise = await fetch(url);
        const data = await dataPromise.json();
        data.sort(function (a, b)
        {
            return a.name['common'] > b.name['common'] ? 1 : -1;
        });
        countries = data;
        this.addCards(countries);
    }
    searchCountry()
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
            if (articles[i].id.toLowerCase().indexOf(filter) > -1)
            {
                articles[i].style.display = "";
            } else
            {
                articles[i].style.display = "none";

            }
        }
    }
}