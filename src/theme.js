/**
* Utility function to calculate the current theme setting.
* Look for a local storage value.
* Fall back to system setting.
* Fall back to light mode.
*/
const darkHtml = `<img src="./assets/icons/moon_icon.png" alt="dark button icon"> dark mode`;
const lightHtml = `<img src="./assets/icons/sun_icon.png" alt="light button icon"> light mode`;
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
    initialize()
    {
        this.updateThemeOnHtml(currentThemeSetting);
        themeBtn.innerHTML = currentThemeSetting === "dark"? lightHtml : darkHtml;
        themeBtn.addEventListener("click", this.handleToggleEvt.bind(this));
    }
   
    handleToggleEvt()
    {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        const aria = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
        themeBtn.innerHTML = newTheme === "dark" ? lightHtml : darkHtml;
        
        themeBtn.setAttribute("aria-label", aria);
        this.updateThemeOnHtml(newTheme);

        localStorage.setItem("theme", newTheme);
        currentThemeSetting = newTheme;
    }
    updateThemeOnHtml(theme){
        document.querySelector("html").setAttribute("data-theme", theme);
    }
}