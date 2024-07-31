const content = document.getElementById("content");
let url = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags';
export class HomePage
{
    constructor()
    {
        this.initialize();
    }
    initialize()
    {
        this.getData()
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
            <p><span>population:</span> ${data.population}</p>
            <p><span>region:</span> ${data.region}</p>
            <p><span>capital:</span> ${data.capital}</p>
        </section>
        <figure><img src=${data.flags['svg']} alt="countries flags image" loading="lazy"></figure>
        </article>`;
        content.insertAdjacentHTML("beforeend", html);
    }
    async getData()
    {

        const dataPromise = await fetch(url);
        const data = await dataPromise.json();
        this.addCards(data);
        // countries = data;

        // console.log('data :>> ', data);
        // console.log('countries.indexOf() :>> ', countries.indexOf(countries.name === "Kenya"));
        // return data;
    }
}