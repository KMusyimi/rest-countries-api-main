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
    async initialize()
    {
        const data = await this.getData(this.url);
        this.setHtml(data);
    }

    async getHtml(data)
    {
        return this.cardHtml(data);
    }

}