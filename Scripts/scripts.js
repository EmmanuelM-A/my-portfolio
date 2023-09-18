// Scripts for nav bar
document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");

    // Checks if the muse has clicked inside a dropdown if so just ignore
    if(!isDropdownButton && e.target.closest("[data-dropdown]") != null) {
        return;
    }

    // If we have clicked a dropdown button get the dropdwon we have clicked and hide ore show it
    let currentDropdown;
    if(isDropdownButton) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle('active');
    }

    // Closes all other dropdowns except the one being viewed
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if(dropdown == currentDropdown) return;
        dropdown.classList.remove('active');
    });
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
});




// Scripts for the show more button in the projects section
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