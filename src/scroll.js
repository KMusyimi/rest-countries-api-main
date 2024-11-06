

export function createBtnElement(position = { bottom: "3em", right: "2em" })
{
    const svg = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path class="cls-1"
                                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm4.707,9.707a1,1,0,0,1-1.414,0L13,8.414V18a1,1,0,0,1-2,0V8.414L8.707,10.707A1,1,0,1,1,7.293,9.293l4-4a1,1,0,0,1,1.414,0l4,4A1,1,0,0,1,16.707,10.707Z" />
                            </svg>`

    const button = document.createElement("button");

    button.type = "button";
    button.id = "back_top";
    button.innerHTML = svg;
    button.style.bottom = position.bottom;
    button.style.right = position.right;
    button.style.display = 'none';
    button.addEventListener("click", handleClick);
    document.getElementById("content").insertAdjacentElement('afterbegin', button);
}

function handleClick()
{
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () =>
{

    const btn = document.getElementById("back_top");
    if (btn)
    {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
        {
            btn.style.display = 'block';

        } else
        {
            btn.style.display = 'none';
        }
    }
});


