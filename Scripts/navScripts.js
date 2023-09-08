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