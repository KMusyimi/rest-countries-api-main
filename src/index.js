import * as css from './style.css'
import { ThemeSwitcher } from './theme';
import { HomePage } from './homepage';
import { Scroll } from './scroll';

const _ = new ThemeSwitcher();

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById('searchForm').reset();
    const dropdownBtn = document.querySelector(".dropdown_btn");
    const homepage = new HomePage();
    const scroll = new Scroll();
    setTimeout(() =>
    {
        document.querySelector(".loading_container").classList.add("hidden");
        document.querySelector(".container").classList.add('visible');
        setTimeout(() =>
        {
            document.querySelector(".loading_container").style.display = 'none';
        }, 100);

    }, 2000);
    dropdownBtn.addEventListener("click", function ()
    {
        dropdownBtn.classList.toggle("expanded");
        setTimeout(() => {
            dropdownBtn.classList.remove("expanded");
        }, 20000);
    });
});

