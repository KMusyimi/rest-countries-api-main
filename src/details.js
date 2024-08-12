import { numberWithCommas } from "./format_population";

const content = document.getElementById("content");
const wrapper = document.querySelector(".wrapper");
const arrowLeft = `<svg viewBox="0 0 32 32" height="23px" width="23px"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id="arrow-left"><line class="cls-1" x1="3" x2="29" y1="16" y2="16"/><line class="cls-1" x1="3" x2="7" y1="16" y2="11"/><line class="cls-1" x1="3" x2="7" y1="16" y2="21"/></g></svg>`;

export class DetailsPage
{
    constructor(data)
    {
        this.data = data;
        this.initialize();
    }
    initialize()
    {
        wrapper.style.display = 'none';
        this.detailsPageContent();
        document.querySelector(".back-btn").addEventListener("click", this.backBtnEvt);
    }
    detailsPageContent()
    {
        content.innerHTML = '';
        this.createBackBtn();
        if (this.data === undefined){
            content.insertAdjacentHTML("beforeend", '<p>Country does not exist</p>')
            return;

        }
        const lastKey = Object.keys(this.data.name['nativeName']).pop();
        const languages = Object.values(this.data.languages).join(', ');
        const html = `
            <article class="country_details">
                <section>
                    <header>
                        <h1 class='fw-800'>${this.data.name['common']}</h1>
                    </header>
                    <div class="details">
                        <p><span class="fw-600">native name:</span> ${this.data.name['nativeName'][lastKey]['common']}</p>
                        <p><span class="fw-600">population:</span> ${numberWithCommas(this.data.population)}</p>
                        <p><span class="fw-600">region:</span> ${this.data.region}</p>
                        <p><span class="fw-600">sub region:</span> ${this.data.subregion}</p>
                        <p><span class="fw-600">capital:</span> ${this.data.capital.join(', ')}</p>
                    </div>
                    <div class="details">
                        <p><span class="fw-600">top level domain:</span> <span class='tld'>${this.data.tld[0]}</span></p>
                        <p><span class="fw-600">currencies:</span> ${this.currencyName(this.data.currencies)}</p>
                        <p><span class="fw-600">languages:</span> ${languages}</p>
                    </div>
                    <div class="borders"><span class="fw-600">border countries:</span> </div>
                </section >
                <figure class="flag"><img src="${this.data.flags['svg']}" alt="${this.data.flags['alt']}" loading="lazy"></figure>
            </article >
        `;
        content.insertAdjacentHTML("beforeend", html);
        this.populateBorderCountries();
    }
    createBackBtn()
    {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add('back-btn', 'bxs-bd');
        button.innerText = "back";
        button.insertAdjacentHTML("afterbegin", arrowLeft);
        content.insertAdjacentElement('afterbegin', button);
    }
    async getCountryNameByCode(url)
    {
        const fetchPromise = await fetch(url);
        const data = await fetchPromise.json();
        return data[0].name['common'];
    }
    populateBorderCountries()
    {
        const borders = document.querySelector(".borders");
        const countriesWrapper = document.createElement("div");
        if (this.data.borders === undefined)
        {
            countriesWrapper.innerHTML = '<span class="bxs-bd">No Border Countries</span>';
            borders.insertAdjacentElement("beforeend", countriesWrapper);
            return;
        }
        this.data.borders.forEach(async el =>
        {
            let url = `https://restcountries.com/v3.1/alpha?codes=${el.toLowerCase()}`;
            const borderList = document.createElement("li");
            const borderLink = document.createElement("a");
            const countries = await this.getCountryNameByCode(url);
            borderLink.id = countries.toLowerCase();
            borderList.className = 'bxs-bd';
            borderLink.innerText = countries;
            borderList.appendChild(borderLink);
            countriesWrapper.appendChild(borderList);
            borders.insertAdjacentElement('beforeend', countriesWrapper);
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
    backBtnEvt(){
        console.log('click :>> ');
    }
}