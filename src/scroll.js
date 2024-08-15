export class Scroll
{
    constructor()
    {
        this.initialize();
    }
    initialize()
    {
        this.backToTopButton({ bottom: "3em", right: "2em" });
        window.addEventListener("scroll", () =>
        {
            this.displayButtonOnScroll();
        });
    }
    displayButtonOnScroll()
    {
        const btn = document.getElementById("back_top");
        if (btn != null)
        {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
            {
                btn.style.display = 'block';

            } else
            {
                btn.style.display = 'none';
            }
        }
    }
    backToTopButton({ bottom, right })
    {
        const button = document.createElement("button");
        button.type = "button";
        button.id = "back_top";
        button.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path class="cls-1" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.707,9.707a1,1,0,0,1-1.414,0L13,8.414V18a1,1,0,0,1-2,0V8.414L8.707,10.707A1,1,0,1,1,7.293,9.293l4-4a1,1,0,0,1,1.414,0l4,4A1,1,0,0,1,16.707,10.707Z"/></svg>`
        button.style.bottom = bottom;
        button.style.right = right;
        button.style.display = 'none';

        button.addEventListener("click", this.backToTopEvt, false);
        content.insertAdjacentElement("beforeend", button);
    }

    backToTopEvt()
    {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}