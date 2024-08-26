import Page from "./Page";

export default class extends Page{
    constructor(param){
        super();
        this.params = this.getCountryParam(param.country);
    }
    getCountryParam(param){
        return param;
    }
}