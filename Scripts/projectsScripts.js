let showMoreBtn = document.querySelector('#show-more-button');
let currentItems = 3;

showMoreBtn.addEventListener("click", () => {
    let projectCards = [...document.querySelectorAll('.project-card')];
    for(let i = currentItems; i < currentItems + 3; i++) {
        projectCards[i].style.display = 'inline-block';
    }
    currentItems += 3;
    if(currentItems >= projectCards.length) {
        showMoreBtn.style.display = "none";
    }
});