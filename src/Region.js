import AbstractView from "./AbstractView";

export default class extends AbstractView
{
    constructor()
    {
        super();
        this.region = location.pathname.substring(1);
        this.setTitle(this.region);
        this.url = `https://restcountries.com/v3.1/region/${this.region}`;
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