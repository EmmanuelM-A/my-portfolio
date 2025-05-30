// ------------------ Scripts for nav bar ----------------------
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

// Close dropdown when a dropdown-link is clicked
document.querySelectorAll('.dropdown-link').forEach(link => {
    link.addEventListener('click', () => {
        const dropdown = link.closest('.dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    });
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 0);
});
// -----------------------------------------------



// ------------------- Scripts for about me section ---------------------------
let changeDescriptionBtns = document.querySelectorAll('.change-content-button');

let educationBtn = document.querySelector('.educationBtn');
let hobbiesBtn = document.querySelector('.hobbiesBtn');
let qualificationBtn = document.querySelector('.qualificationsBtn');

let descriptions = document.querySelectorAll('.content');

function showDescription(event, descriptionToShow) {
    for(let btn of changeDescriptionBtns) {
        btn.classList.remove("active-content-link");
    }
    for(let btn of descriptions) {
        btn.classList.remove("active-content");
    }
    event.currentTarget.classList.add("active-content-link");
    document.querySelector(descriptionToShow).classList.add("active-content");
}

educationBtn.addEventListener("click", (e) => {
    showDescription(e, '#education-list');
});

hobbiesBtn.addEventListener("click", (e) => {
    showDescription(e, '#hobbies-list');
});

qualificationBtn.addEventListener("click", (e) => {
    showDescription(e, '#qualifications-list');
});

// ----------------------------------------


// ------------------- Scripts for Skills section ---------------------------
document.querySelectorAll('.skills-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from all buttons
    document.querySelectorAll('.skills-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    // Hide all grids
    document.querySelectorAll('.skills-grid').forEach(grid => grid.classList.remove('active'));
    // Show selected grid
    const cat = this.getAttribute('data-skill-category');
    document.getElementById('skills-' + cat).classList.add('active');
  });
});
// ----------------------------------------------------------------------------


// ------------------- Scripts for experience section ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");
    const timelineLine = document.querySelector(".timeline-line");
    const containers = document.querySelectorAll(".container");

    // Animate timeline cards in
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.1 }
    );
    containers.forEach(el => observer.observe(el));

    // Animate timeline line height on scroll
    function updateTimelineLine() {
        if (!timeline || !timelineLine) return;
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const totalHeight = timeline.offsetHeight;

        // If the top of the timeline is below the bottom of the viewport, line is 0
        if (rect.top > windowHeight) {
            timelineLine.style.height = '0px';
            return;
        }

        // If the bottom of the timeline is above the top of the viewport, line is full
        if (rect.bottom < 0) {
            timelineLine.style.height = totalHeight + 'px';
            return;
        }

        // Otherwise, calculate how much is visible
        let visibleStart = Math.max(0, windowHeight - rect.top);
        let visibleEnd = Math.min(windowHeight, rect.bottom);
        let visibleHeight = visibleEnd - Math.max(rect.top, 0);

        // Clamp between 0 and totalHeight
        let percent = Math.max(0, Math.min(visibleHeight / totalHeight, 1));
        timelineLine.style.height = (percent * totalHeight) + 'px';
    }

    window.addEventListener('scroll', updateTimelineLine);
    window.addEventListener('resize', updateTimelineLine);
    updateTimelineLine();
});

// ----------------------------------------------------------------------------


// ------------------- Scripts for projects section ---------------------------
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
// ----------------------------------------