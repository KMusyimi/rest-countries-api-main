
export default class
{
    constructor()
    {

    }
    setTitle(title)
    {
        title = title.charAt(0).toUpperCase() + title.slice(1);
        document.title = 'Rest Countries | ' + title;
    }
    async getHtml()
    {
        return ``;
    }
    async getData(url)
    {
        const fetchPromise = await fetch(url);
        return await fetchPromise.json();
    }
    numberWithCommas(x)
    {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    setHtml(arr)
    {
        document.getElementById("content").innerHTML = '';
        this.sortDataAlphabetically(arr);
        arr.forEach(async data =>
        {
            this.verifyCapital(data);
            let html = await this.getHtml(data);
            document.getElementById("content").insertAdjacentHTML('beforeend', html);
        });
    }
    sortDataAlphabetically(arr){
        arr.sort(function (a, b)
        {
            return a.name['common'] > b.name['common'] ? 1 : -1;
        });
    }
    verifyCapital(data)
    {
        if (data.capital === undefined)
        {
            data.capital = 'has no capital';
        } else
        {
            data.capital = data.capital.join(', ');
        }
    }
    cardHtml(data){
        return `
            <article id='${data.name['common'].toLowerCase()}' class='country_card'>
                <section>
                    <h1 id="name" class="fw-800">${data.name['common']}</h1>
                    <p><span class="fw-600">population:</span> ${this.numberWithCommas(data.population)}</p>
                    <p><span class="fw-600">region:</span> ${data.region}</p>
                    <p><span class="fw-600">capital:</span> ${data.capital}</p>
                </section>
                <figure><img src=${data.flags['png']} alt="${data.flags['alt']}" loading="lazy"></figure>
            </article>
            `;
    }
}