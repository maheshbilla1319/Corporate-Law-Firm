/* =========================================================
   CORPORATE LAW FIRM JS
========================================================= */


/* =========================================================
   AOS INITIALIZATION
========================================================= */

AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
    offset: 90
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }

});


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 30px rgba(16,42,67,.12)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            const counter = entry.target;

            const target =
                Number(counter.dataset.target);

            let current = 0;

            const duration = 1800;

            const increment =
                target / (duration / 16);

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.textContent =
                        Math.floor(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    },
    {
        threshold: .5
    }
);


counters.forEach(counter => {
    counterObserver.observe(counter);
});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(
    ".nav a[href^='#']"
);

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            current &&
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================================
   IMAGE LOADING EFFECT
========================================================= */

const images = document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener("load", () => {

        image.classList.add("loaded");

    });

});


/* =========================================================
   PREVENT EMPTY HASH JUMP
========================================================= */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {
        event.preventDefault();
    });

});