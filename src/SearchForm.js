
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector("#searchForm");

export default class 
{
    constructor()
    {
        // super();
    }
    initialize()
    {
        // searchForm.addEventListener("submit", this.formSubmit.bind(this));
        searchInput.addEventListener("keyup", this.searchInputEvt);
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