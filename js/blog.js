/* =====================================================
   STERLING LAW — BLOG JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }


    /* =================================================
       HEADER
    ================================================= */

    const header = document.getElementById("siteHeader");

    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });
    }


    /* =================================================
       MOBILE MENU — OPEN / CLOSE TOGGLE
    ================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        const icon = menuToggle.querySelector("i");


        function openMenu() {

            mainNav.classList.add("open");

            if (icon) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            }

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );

            menuToggle.setAttribute(
                "title",
                "Close navigation"
            );

            document.body.classList.add("menu-open");
        }


        function closeMenu() {

            mainNav.classList.remove("open");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.setAttribute(
                "title",
                "Open navigation"
            );

            document.body.classList.remove("menu-open");
        }


        /* TOGGLE BUTTON */

        menuToggle.addEventListener("click", () => {

            if (mainNav.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        /* CLOSE WHEN CLICKING NAV LINK */

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        /* CLOSE WITH ESC */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });


        /* CLOSE WHEN SCREEN BECOMES DESKTOP */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 796) {
                closeMenu();
            }

        });

    }


    /* =================================================
       CATEGORY FILTER
    ================================================= */

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const articleCards =
        document.querySelectorAll(".article-card");

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            articleCards.forEach(card => {

                const category =
                    card.getAttribute("data-category");

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hidden");

                    card.setAttribute(
                        "data-aos",
                        "fade-up"
                    );

                } else {

                    card.classList.add("hidden");

                }

            });

            if (typeof AOS !== "undefined") {
                AOS.refresh();
            }

        });

    });


    /* =================================================
       FAQ
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) {
            return;
        }

        question.setAttribute(
            "aria-expanded",
            "false"
        );

        question.addEventListener("click", () => {

            const active =
                item.classList.contains("active");


            /* CLOSE ALL */

            faqItems.forEach(other => {

                other.classList.remove("active");

                const otherQuestion =
                    other.querySelector(".faq-question");

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });


            /* OPEN CLICKED */

            if (!active) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =================================================
       COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(".counter");

    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.getAttribute(
                                    "data-target"
                                )
                            );

                        let current = 0;

                        const duration = 1500;

                        const increment =
                            target / (duration / 16);


                        const update = () => {

                            current += increment;

                            if (current < target) {

                                counter.textContent =
                                    Math.floor(current);

                                requestAnimationFrame(
                                    update
                                );

                            } else {

                                counter.textContent =
                                    target + "+";

                            }

                        };

                        update();

                        counterObserver.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }

/* =================================================
   NEWSLETTER
================================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterMessage =
    document.getElementById("newsletterMessage");

if (
    newsletterForm &&
    newsletterEmail &&
    newsletterMessage
) {
    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                newsletterEmail.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            /* EMPTY */
            if (!email) {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                newsletterEmail.focus();

                return;
            }

            /* INVALID EMAIL */
            if (!emailPattern.test(email)) {

                newsletterMessage.textContent =
                    "Please enter a valid email address.";

                newsletterEmail.focus();

                return;
            }

            /* SUCCESS */
            newsletterMessage.textContent =
                "Thank you. You are subscribed to the Sterling Brief.";

            /* REDIRECT TO 404 PAGE */
            setTimeout(() => {
                window.location.href = "404.html";
            }, 500);

        }
    );
}


    /* =================================================
       SMOOTH ANCHOR
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(targetId);


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

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