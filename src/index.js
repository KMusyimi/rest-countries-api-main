import * as css from './style.css'
import { ThemeSwitcher } from './theme';
import { HomePage } from './homepage';

const _ = new ThemeSwitcher();
const navLinks = document.querySelectorAll(".dropdown_wrapper > a");

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById('searchForm').reset();
    navLinks.forEach(link =>{
        link.addEventListener("click", evt =>{
            evt.preventDefault();
            console.log('evt.getAttribute(href) :>> ', evt.target.getAttribute('href'));
            const clickedLink = evt.target.getAttribute('href').substring(1);
            console.log('clickedLink :>> ', clickedLink);
        })
    })
    const dropdownBtn = document.querySelector(".dropdown_btn");
    const homepage = new HomePage();
    setTimeout(() =>
    {
        document.querySelector(".loading_container").classList.add("hidden");
        document.querySelector(".container").classList.add('visible');
    }, 2000);
    window.scrollBy({ top: 20, left: 0, behavior: 'smooth' });
    dropdownBtn.addEventListener("click", function ()
    {
        dropdownBtn.classList.toggle("expanded");
    });


});

