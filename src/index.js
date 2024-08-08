import * as css from './style.css'
import { ThemeSwitcher } from './theme';
import { HomePage } from './homepage';

const _ = new ThemeSwitcher();

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById('searchForm').reset();
    const dropdownBtn = document.querySelector(".dropdown_btn");
    const homepage = new HomePage();
    setTimeout(() =>
    {
        document.querySelector(".loading_container").classList.add("hidden");
        document.querySelector(".container").classList.add('visible');
        setTimeout(() =>
        {
            document.querySelector(".loading_container").style.display = 'none';
        }, 100);

    }, 2000);
    window.scrollBy({ top: 20, left: 0, behavior: 'smooth' });
    dropdownBtn.addEventListener("click", function ()
    {
        dropdownBtn.classList.toggle("expanded");
        setTimeout(() => {
            dropdownBtn.classList.remove("expanded");
        }, 20000);
    });
});

