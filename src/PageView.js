import Page from "./Page";

export default class extends Page{
    constructor(param){
        super();
        console.log('param :>> ', param.country.replace(/-/g, " "));
        this.params = this.getCountryParam(param.country.replace(/-/g, " "));
    }
    getCountryParam(param){
        console.log('param :>> ', param);
        return param;
    }
}