import AbstractView from "./AbstractView";


const arrowLeft = `<svg viewBox="0 0 32 32" height="23px" width="23px"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-left"><line class="cls-1" x1="3" x2="29" y1="16" y2="16"/><line class="cls-1" x1="3" x2="7" y1="16" y2="11"/><line class="cls-1" x1="3" x2="7" y1="16" y2="21"/></g></svg>`;


export default class extends AbstractView
{
    constructor(param)
    {
        super();
        this.param = param;
        this.params = this.getCountryParam();
        this.url = `https://restcountries.com/v3.1/name/${this.params}?fullText=true`;
    }

    async getHtml()
    {
        document.getElementById("content").classList.add("page");
        document.getElementById("content").innerHTML = '';

        this.setTitle(this.params);

        this.createBackBtn();

        const dataPromise = await this.getData(this.url);

        if (dataPromise.status === 404)
        {
            return `<article><h1>Country data is currently not available!</h1></article>`;
        }

        const html = await Promise.all(dataPromise.map(async data =>
        {
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
    getCountryParam()
    {
        if (this.param.country) { return this.param.country; }

        const param = new URLSearchParams(location.search).get('country');
        return param.replace(/-/g, " ");
    }
    async getBordersHtml(borders)
    {
        if (borders === undefined)
        {
            return '<div class="bxs-bd">No Border Countries</div>';
        }
        const bordersHtml = await Promise.all(borders.map(async border =>
        {
            const data = await this.getBordersData(border);
            return `
                <li class="bxs-bd">
                    <a href="/page/${data.replace(/\s+/g, '-').toLowerCase()}" data-link>${data}</a>
                </li>`;
        }));
        return bordersHtml.join('');
    }
    createBackBtn()
    {
        const button = document.createElement("button");
        button.type = "button";
        button.id = 'back-btn';
        button.classList.add('bxs-bd');
        button.innerText = "back";
        button.insertAdjacentHTML("afterbegin", arrowLeft);
        button.addEventListener("click", this.backBtnEvt);
        document.getElementById("content").insertAdjacentElement('afterbegin', button);
    }
    async getBordersData(country)
    {
        let url = `https://restcountries.com/v3.1/alpha?codes=${country.toLowerCase()}`;
        const data = await this.getData(url);
        return data[0].name['common'];
    }
    currencyName(obj)
    {
        const values = Object.values(obj);
        return values[0].name;
    }
    backBtnEvt()
    {
        history.back();
    }
}