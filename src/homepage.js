import AbstractView from "./AbstractView";

let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';

export class HomePage extends AbstractView
{
    constructor()
    {
        super();
        this.setTitle("Home");
        this.url = url;
    }
    async getHtml()
    {
        document.getElementById("content").innerHTML = '';
        document.getElementById("content").classList.remove("page");

        const dataPromise = await this.getData(this.url);

        this.sortDataAlphabetically(dataPromise);

        return dataPromise.map(data =>
        {
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