/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/

const themeBtn = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

function calcSettingThemeStr({ localStorageTheme, systemSettingDark })
{
    
    if (localStorageTheme !== null)
    {
        return localStorageTheme;
    }

    if (systemSettingDark.matches)
    {
        return "dark";
    }

    return "light";
}

let currentThemeSetting = calcSettingThemeStr({ localStorageTheme: localStorageTheme, systemSettingDark: systemSettingDark });

export class ThemeSwitcher
{
    constructor()
    {
        this.initialize();
    }
    themeImgElement(theme){
        const img = document.createElement('img');
        
        img.src = theme === 'dark' ? './assets/icons/sun_icon.png' : './assets/icons/moon_icon.png';
        img.alt = theme === 'dark' ? 'light button icon' : 'dark button icon';

        return img;

    }
    initialize()
    {
        this.updateThemeOnHtml(currentThemeSetting);
       
        const img = this.themeImgElement(currentThemeSetting);
        
        themeBtn.textContent = currentThemeSetting === 'dark' ? 'light mode' : 'dark mode';
        themeBtn.insertAdjacentElement("afterbegin", img);

        themeBtn.addEventListener("click", this.handleToggleEvt.bind(this));
    }

    handleToggleEvt()
    {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        const aria = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
        const img = this.themeImgElement(newTheme);

        themeBtn.textContent = newTheme === "dark" ? 'light mode' : 'dark mode';
        themeBtn.insertAdjacentElement("afterbegin", img);

        themeBtn.ariaLabel = aria;

        this.updateThemeOnHtml(newTheme);

        localStorage.setItem("theme", newTheme);
        currentThemeSetting = newTheme;
    }
    updateThemeOnHtml(theme)
    {
        document.querySelector("html").setAttribute("data-theme", theme);
    }
}