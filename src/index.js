import * as css from './style.css'
import { ThemeSwitcher } from './theme';
import { HomePage } from './homepage';

let countries;
window.addEventListener("load", () =>
{
    setTimeout(() =>
        {
            document.querySelector(".loading_container").classList.add("hidden");
            document.querySelector(".container").classList.add('visible');
        }, 2000);
        const homepage = new HomePage();
});
document.addEventListener("DOMContentLoaded", () =>
{
    window.scrollBy({top:20, left:0, behavior:'smooth'});
    const _ = new ThemeSwitcher();
    const dropdownBtn = document.querySelector(".dropdown_btn");
    dropdownBtn.addEventListener("click", function ()
    {
        dropdownBtn.classList.toggle("expanded");
    });
    
//   getData()
});


// async function getData()
// {

//     const dataPromise = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags');
//     const data = await dataPromise.json();
//     countries = data;

//     console.log('data :>> ', data);
//     console.log('countries.indexOf() :>> ', countries.indexOf(countries.name === "Kenya"));
//     return data;
// }
