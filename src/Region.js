import { HomePage } from "./homepage";

export default class extends HomePage
{
    constructor()
    {
        super();
        this.region = location.pathname.substring(1);
        this.setTitle(this.region);
        this.url = `https://restcountries.com/v3.1/region/${this.region}`;
    }
   
}