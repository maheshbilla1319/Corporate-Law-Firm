/* =====================================================
   CONTACT PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   AOS INITIALIZATION
===================================================== */

AOS.init({
    duration: 850,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
});


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

const siteHeader = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("show");

    const icon = menuToggle.querySelector("i");

    if (mainNav.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

});


/* Close mobile menu */

document.querySelectorAll(".main-nav a").forEach(link => {

    link.addEventListener("click", () => {
        mainNav.classList.remove("show");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    });

});


/* =====================================================
   BANNER SLIDER
===================================================== */

const slides = document.querySelectorAll(".banner-slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");

let currentSlide = 0;
let sliderTimer;


function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    }

    if (index < 0) {
        currentSlide = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }
}


function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}


function previousSlide() {
    currentSlide--;
    showSlide(currentSlide);
}


function startSlider() {

    clearInterval(sliderTimer);

    sliderTimer = setInterval(() => {
        nextSlide();
    }, 5000);

}


nextBtn.addEventListener("click", () => {
    nextSlide();
    startSlider();
});


prevBtn.addEventListener("click", () => {
    previousSlide();
    startSlider();
});


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
        startSlider();
    });

});


showSlide(currentSlide);
startSlider();


/* =====================================================
   FAQ ACCORDION
===================================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }

    });

});
/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function showError(input, message) {
    const parent = input.closest(".input-group");
    const error = parent.querySelector(".error-message");

    error.textContent = message;
    input.style.borderColor = "#C79A4A";
}

function clearError(input) {
    const parent = input.closest(".input-group");
    const error = parent.querySelector(".error-message");

    error.textContent = "";
    input.style.borderColor = "";
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("fullName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const service = document.getElementById("service");
        const message = document.getElementById("message");

        let valid = true;

        /* Name */
        if (name.value.trim().length < 2) {
            showError(name, "Please enter your full name.");
            valid = false;
        } else {
            clearError(name);
        }

        /* Email */
        if (!validateEmail(email.value.trim())) {
            showError(email, "Please enter a valid email address.");
            valid = false;
        } else {
            clearError(email);
        }

        /* Phone */
        if (phone.value.trim().length < 8) {
            showError(phone, "Please enter a valid phone number.");
            valid = false;
        } else {
            clearError(phone);
        }

        /* Service */
        if (service.value === "") {
            showError(service, "Please select a legal area.");
            valid = false;
        } else {
            clearError(service);
        }

        /* Message */
        if (message.value.trim().length < 10) {
            showError(
                message,
                "Please provide some details about your matter."
            );
            valid = false;
        } else {
            clearError(message);
        }

        /* Success + Redirect */
        if (valid) {

            formSuccess.classList.add("show");

            setTimeout(() => {
                window.location.href = "404.html";
            }, 800);

        }

    });

}

/* =====================================================
   INPUT ERROR CLEAR
===================================================== */

const formInputs = contactForm.querySelectorAll(
    "input, textarea, select"
);

formInputs.forEach(input => {

    input.addEventListener("input", () => {
        clearError(input);
    });

    input.addEventListener("change", () => {
        clearError(input);
    });

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const headerHeight = siteHeader.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});

/* =========================================================
   STERLING LAW — MOBILE MENU JS
   OPEN / CLOSE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (!menuToggle || !nav) {
        return;
    }

    /* =====================================================
       OPEN / CLOSE MENU
    ===================================================== */

    menuToggle.addEventListener("click", function () {

        const isOpen = nav.classList.toggle("active");

        document.body.classList.toggle("menu-open", isOpen);

        /* Accessibility */
        menuToggle.setAttribute("aria-expanded", isOpen);

        /* Change hamburger icon */
        const icon = menuToggle.querySelector("i");

        if (icon) {
            if (isOpen) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    });

    /* =====================================================
       CLOSE AFTER CLICKING HOME / ABOUT / SERVICES / BLOG
       / CONTACT
    ===================================================== */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            nav.classList.contains("active") &&
            !nav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }

    });

    /* =====================================================
       ESC KEY CLOSE
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }

    });

    /* =====================================================
       DESKTOP — RESET MOBILE MENU
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 796) {

            nav.classList.remove("active");
            document.body.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }

    });

});