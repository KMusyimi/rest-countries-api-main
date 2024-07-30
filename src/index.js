import './style.css'

let countries;
window.addEventListener("load", () =>
{
    
    getData();
    const _ = new ThemeSwitcher();
});

async function getData()
{

    const dataPromise = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags');
    const data = await dataPromise.json();
    countries = data;
    console.log('data :>> ', data);
    console.log('countries.indexOf() :>> ', countries.indexOf(countries.name === "Kenya"));
}
