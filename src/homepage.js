const content = document.getElementById("content");
let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
let countries;
export class HomePage
{
    constructor()
    {
        this.backToTop({ bottom: "3em", right: "2em" });
        this.initialize();
    }
    initialize()
    {
        this.getData();
        window.addEventListener("scroll", () =>
        {
            this.displayButtonOnScroll();
        });
    }
    addCards(arr)
    {
        console.log('arr.length :>> ', arr.length);
        arr.forEach(data =>
        {
            this.createCard(data);
        });
    }
    createCard(data)
    {
        let html = `<article class="country_card">
        <section>
            <h1>${data.name['common']}</h1>
            <p><span>population:</span> ${this.numberWithCommas(data.population)}</p>
            <p><span>region:</span> ${data.region}</p>
            <p><span>capital:</span> ${data.capital}</p>
        </section>
        <figure><img src=${data.flags['png']} alt="countries flags image" loading="lazy"></figure>
        </article>`;
        content.insertAdjacentHTML("beforeend", html);
    }
    numberWithCommas(x)
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    backToTop({ bottom, right })
    {
        const button = document.createElement("button");
        const img = document.createElement("img");
        button.type = "button";
        button.id = "back_top";
        img.src = "./assets/icons/arrow_up.png";
        img.alt = "arrow up icon";
        button.style.bottom = bottom;
        button.style.right = right;
        button.style.display = 'none';

        button.appendChild(img);
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
        countries = data;
        countries.sort((a, b) => (a.name['common'] > b.name['common'])) ? 1 : -1;
        this.addCards(countries);
    }
}