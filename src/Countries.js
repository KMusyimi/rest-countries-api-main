import AbstractView from "./AbstractView";
import { createBtnElement } from "./scroll";


export class Countries extends AbstractView
{
    constructor()
    {
        super();
        this.setTitle(location.pathname.substring(1) || "Home");
        this.data = [];
        this.url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
    }

    async getHtml()
    {
        const region = location.pathname.substring(1) || '';
        document.getElementById("content").innerHTML = '';
        document.getElementById("content").className = 'main';
        
        createBtnElement();
      
        if (this.data.length === 0)
        {
            const dataPromise = await this.getData(this.url);

            if (dataPromise.status === 404)
            {
                return `<h1>Cannot find countries</h1>`
            }
            this.data = [...dataPromise];
        }

        const dataArr = region ? this.data.filter(data => data.region.toLowerCase() === region) : this.data;


        this.sortDataAlphabetically(dataArr);
        document.querySelector(".dropdown_btn").classList.remove("expanded");

        return dataArr.map(data =>
        {
            const nameLowerCase = data.name['common'].replace(/\s+/g, '-').toLowerCase();
          
            return `
            <article id='${nameLowerCase}' class='country_card'>
                <section>
                    <h1 class="fw-800"><a id='country__link' href="/page/${nameLowerCase}" data-link>${data.name['common']}</a></h1>
                    <p><span class="fw-600">population:</span> ${this.numberWithCommas(data.population)}</p>
                    <p><span class="fw-600">region:</span> ${data.region}</p>
                    <p><span class="fw-600">capital:</span> ${data.capital?.join(',')|| ' no capital city'}</p>
                </section>
                <figure><img src=${data.flags['png']} alt="${data.flags['alt']}" loading="lazy"></figure>
            </article>`;
        }).join('');

    }
}