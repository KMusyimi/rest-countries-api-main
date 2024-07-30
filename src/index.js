import './style.css'
import { ThemeSwitcher } from './theme';

let countries;
window.addEventListener("load", () =>
{
    const _ = new ThemeSwitcher();
    const dropdownBtn = document.querySelector(".dropdown_btn");
    dropdownBtn.addEventListener("click", function(){
        dropdownBtn.classList.toggle("expanded");
    });
    getData();
});

async function getData()
{

    const dataPromise = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags');
    const data = await dataPromise.json();
    countries = data;
    console.log('data :>> ', data);
    console.log('countries.indexOf() :>> ', countries.indexOf(countries.name === "Kenya"));
}
