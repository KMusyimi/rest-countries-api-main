import AbstractView from "./AbstractView";

const wrapper = document.querySelector(".wrapper");

const arrowLeft = `<svg viewBox="0 0 32 32" height="23px" width="23px"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-left"><line class="cls-1" x1="3" x2="29" y1="16" y2="16"/><line class="cls-1" x1="3" x2="7" y1="16" y2="11"/><line class="cls-1" x1="3" x2="7" y1="16" y2="21"/></g></svg>`;

export class DetailsPage extends AbstractView
{
    constructor(country)
    {
        super();
        this.country = country;
        this.url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
        this.setTitle(country);
    }
    async initialize()
    {
        wrapper.style.display = 'none';
        const data = await this.getData(this.url);
        this.data = data[0];
        this.setHtml();
    }
    async setHtml()
    {
        document.getElementById("content").innerHTML = '';

        this.BackBtnElement();

        if (this.data === undefined)
        {
            const html = `
                <article>
                    <h1>Country does not exist!</h1>
                </article>`;
            document.getElementById("content").insertAdjacentHTML("beforeend", html);
            return;
        }

        const html = await this.getHtml();
        document.getElementById("content").insertAdjacentHTML('beforeend', html);
        this.populateBorders(this.data);
    }
    async getHtml()
    {
        const lastKey = Object.keys(this.data.name['nativeName']).pop();
        const languages = Object.values(this.data.languages).join(', ');
        return `
            <article class="country_details">
                <section>
                    <header>
                        <h1 class='fw-800'>${this.data.name['common']}</h1>
                    </header>
                    <div class="details">
                        <p><span class="fw-600">native name:</span> ${this.data.name['nativeName'][lastKey]['common']}</p>
                        <p><span class="fw-600">population:</span> ${this.numberWithCommas(this.data.population)}</p>
                        <p><span class="fw-600">region:</span> ${this.data.region}</p>
                        <p><span class="fw-600">sub region:</span> ${this.data.subregion}</p>
                        <p><span class="fw-600">capital:</span> ${this.data.capital.join(', ')}</p>
                    </div>
                    <div class="details">
                        <p><span class="fw-600">top level domain:</span> <span class='tld'>${this.data.tld[0]}</span></p>
                        <p><span class="fw-600">currencies:</span> ${this.currencyName(this.data.currencies)}</p>
                        <p><span class="fw-600">languages:</span> ${languages}</p>
                    </div>
                    <div class="borders"><span class="fw-600">border countries:</span><div class='borders__wrapper'></div></div>
                </section >
                <figure class="flag"><img src="${this.data.flags['svg']}" alt="${this.data.flags['alt']}" loading="lazy"></figure>
            </article >
        `;
    }
    BackBtnElement()
    {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add('back-btn', 'bxs-bd');
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
    async populateBorders()
    {
        console.log('thisData :>> ', this.data);
        const borderWrapper = document.querySelector(".borders__wrapper");
        if (this.data.borders === undefined)
        {
            borderWrapper.insertAdjacentHTML('afterbegin', '<span class="bxs-bd">No Border Countries</span>');
            return;
        }
        this.data.borders.forEach(async country =>
        {
            const el = await this.getBordersData(country);
            const html = `
                <li class="bxs-bd">
                    <a href="/${el.toLowerCase()}" data-link>${el}</a>
                </li>`;
            borderWrapper.insertAdjacentHTML("beforeend", html);
        });
    }

    currencyName(obj)
    {
        for (const key in obj)
        {
            if (Object.prototype.hasOwnProperty.call(obj, key))
            {
                const el = obj[key];
                return el.name
            }
        }
    }
    backBtnEvt()
    {
        history.back();
        wrapper.style.display = '';
    }
}