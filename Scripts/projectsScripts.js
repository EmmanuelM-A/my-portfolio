let showMore = document.querySelector(".show-more-button");
let currentItems = 3;

showMore.addEventListener("clcik", () => {
    let projectCards = [...document.querySelectorAll("#projects .projects-container .display-projects .project-card")];
    for(let i = currentItems; i < currentItems + 3; i++) {
        projectCards[i].style.display = "inline-block";
    }
    currentItems += 3;

    if(currentItems >= projectCards.length) {
        showMore.innerTEXT = "Show Less";
    }
});