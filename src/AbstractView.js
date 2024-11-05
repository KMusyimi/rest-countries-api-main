
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

    sortDataAlphabetically(arr)
    {
        arr.sort(function (a, b)
        {
            return a.name['common'] > b.name['common'] ? 1 : -1;
        });
    }
    formatCapital(data)
    {
        return data.capital.join(', ');
    }
    
}