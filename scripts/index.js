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


// DARKMODE JS

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if (darkmode === 'active') enableDarkmode();

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enableDarkmode() : disableDarkmode();
});


// --------------------------------------------------------------------------



// ------------------- PORTFOLIO DROPDOWN ---------------------------

document.addEventListener("DOMContentLoaded", () => {
    const portfolioDropdown = document.querySelector(".portfolio-dropdown");
    const toggle = portfolioDropdown.querySelector(".dropdown-toggle");
    const menu = portfolioDropdown.querySelector(".portfolio-dropdown-menu");

    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("show");
        portfolioDropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
        if (!portfolioDropdown.contains(e.target)) {
            menu.classList.remove("show");
            portfolioDropdown.classList.remove("open");
        }
    });
});

// ----------------------------------------------------------------------------



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
    const containers = document.querySelectorAll(".container");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const idx = Array.from(containers).indexOf(entry.target);
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, idx * 180); // 180ms delay per card
                } else {
                    entry.target.classList.remove("show");
                }
            });
        },
        { threshold: 0.3 }
    );
    containers.forEach(el => observer.observe(el));
});
// ----------------------------------------------------------------------------


// ------------------- Scripts for projects section ---------------------------
/*let showMoreBtn = document.querySelector('#show-more-button');
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
});*/

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".project-card");
    const showMoreBtn = document.getElementById("show-more-button");
    const showLessBtn = document.getElementById("show-less-button");
    const batchSize = 3;
    let currentVisible = 0;

    function showNextBatch() {
        for (let i = currentVisible; i < currentVisible + batchSize && i < cards.length; i++) {
            cards[i].classList.add("visible");
        }
        currentVisible += batchSize;

        if (currentVisible >= cards.length) {
            showMoreBtn.style.display = "none";
        }
        showLessBtn.style.display = "inline-block";
    }

    function showLess() {
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("visible");
        }
        currentVisible = 0;
        showNextBatch(); // show first batch again

        showMoreBtn.style.display = "inline-block";
        showLessBtn.style.display = "none";
    }

    showNextBatch(); // Initial batch on load

    showMoreBtn.addEventListener("click", showNextBatch);
    showLessBtn.addEventListener("click", showLess);
});


// ----------------------------------------


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessageDiv = document.getElementById('successMessage');

    const inputs = [
        { element: nameInput, errorElement: nameError, type: 'text', message: 'Name cannot be empty.' },
        { element: emailInput, errorElement: emailError, type: 'email', message: 'Please enter a valid email address.' },
        { element: messageTextarea, errorElement: messageError, type: 'text', message: 'Message cannot be empty.' }
    ];

    // Function to set validation styles and messages
    function setValidationStatus(inputElement, errorElement, status, message = '') {
        inputElement.classList.remove('invalid', 'warning', 'valid');
        errorElement.textContent = '';

        if (status === 'invalid') {
            inputElement.classList.add('invalid');
            errorElement.textContent = message;
        } else if (status === 'warning') {
            inputElement.classList.add('warning');
            errorElement.textContent = message;
        } else if (status === 'valid') {
            inputElement.classList.add('valid');
        }
    }

    // Real-time validation on input/change
    inputs.forEach(input => {
        input.element.addEventListener('input', () => {
            if (input.element.value.trim() === '') {
                setValidationStatus(input.element, input.errorElement, 'invalid', input.message);
            } else if (input.type === 'email' && !isValidEmail(input.element.value.trim())) {
                setValidationStatus(input.element, input.errorElement, 'warning', 'Please enter a valid email format.');
            } else {
                setValidationStatus(input.element, input.errorElement, 'valid');
            }
        });
    });

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form submission
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        let allFieldsValid = true;

        // Perform final validation on all fields
        inputs.forEach(input => {
            if (input.element.value.trim() === '') {
                setValidationStatus(input.element, input.errorElement, 'invalid', input.message);
                allFieldsValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.element.value.trim())) {
                setValidationStatus(input.element, input.errorElement, 'warning', 'Please enter a valid email format.');
                allFieldsValid = false;
            } else {
                setValidationStatus(input.element, input.errorElement, 'valid');
            }
        });

        if (!allFieldsValid) {
            console.log('Form has validation errors.');
            return; // Stop submission if validation fails
        }

        // If all fields are valid, submit the form data
        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Formspree submission successful
                console.log('Form submitted successfully!');
                successMessageDiv.style.display = 'block'; // Show success message
                contactForm.reset(); // Clear the form
                // Optionally, remove valid classes after a delay or immediately
                inputs.forEach(input => {
                    input.element.classList.remove('valid');
                });
                setTimeout(() => {
                    successMessageDiv.style.display = 'none'; // Hide success message after 5 seconds
                }, 5000);
            } else {
                // Formspree submission failed
                console.error('Form submission failed:', response.statusText);
                alert('Oops! There was a problem sending your message. Please try again later.');
            }
        } catch (error) {
            console.error('Network error during form submission:', error);
            alert('A network error occurred. Please check your internet connection and try again.');
        }
    });
});