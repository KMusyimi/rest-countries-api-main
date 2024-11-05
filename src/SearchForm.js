
const searchInput = document.querySelector("#search");

export default class 
{
    constructor()
    {
    }
    initialize()
    {
        searchInput.addEventListener("change", this.searchInputEvt);
    }

    searchInputEvt(evt)
    {
        evt.preventDefault();
        const filter = searchInput.value.toLowerCase();
        const articles = document.querySelectorAll("#content > article");
        for (let i = 0; i < articles.length; i++)
        {
            if (articles[i].id.indexOf(filter) > -1)
            {
                articles[i].style.display = "";
            } else
            {
                articles[i].style.display = "none";
            }
        }
    }
}