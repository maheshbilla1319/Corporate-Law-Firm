/* =====================================================
   STERLING & CO. — ABOUT PAGE JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PAGE LOADER
    ================================================= */

    const loader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader?.classList.add("hide");
        }, 500);

    });


    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 1000,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            mirror: false
        });

    }


    /* =================================================
       GSAP HERO ANIMATION
    ================================================= */

    if (typeof gsap !== "undefined") {

        gsap.from(".hero-copy h1", {
            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: .25,
            ease: "power4.out"
        });

        gsap.from(".hero-main-image", {
            x: 100,
            opacity: 0,
            duration: 1.2,
            delay: .45,
            ease: "power4.out"
        });

        gsap.from(".hero-floating-image", {
            y: 70,
            opacity: 0,
            duration: 1,
            delay: .8,
            ease: "power3.out"
        });

        gsap.from(".hero-side-text", {
            x: 30,
            opacity: 0,
            duration: .8,
            delay: 1,
            ease: "power3.out"
        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const opened = mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active", opened);

            menuToggle.setAttribute(
                "aria-label",
                opened
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const header = document.getElementById("siteHeader");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =================================================
       SCROLL PROGRESS
    ================================================= */

    const progress = document.getElementById("scrollProgress");

    function updateProgress() {

        if (!progress) return;

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

        progress.style.width = `${percentage}%`;

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters = document.querySelectorAll(".counter");

    let countersStarted = false;

    function animateCounters() {

        if (countersStarted) return;

        const numberSection =
            document.querySelector(".numbers-section");

        if (!numberSection) return;

        const sectionTop =
            numberSection.getBoundingClientRect().top;

        if (sectionTop < window.innerHeight * .85) {

            countersStarted = true;

            counters.forEach(counter => {

                const target =
                    Number(counter.dataset.target);

                const duration = 1600;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(elapsed / duration, 1);

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    counter.textContent =
                        Math.floor(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }

                }

                requestAnimationFrame(updateCounter);

            });

        }

    }

    window.addEventListener("scroll", animateCounters);

    animateCounters();


    /* =================================================
       TESTIMONIAL SLIDER
    ================================================= */

    const testimonials = [

        {
            quote:
                "Sterling helped us understand the legal complexity without losing sight of the commercial opportunity.",
            name:
                "Michael Reed",
            role:
                "CEO, Global Ventures"
        },

        {
            quote:
                "Their advice gave our leadership team clarity at a critical stage of our growth.",
            name:
                "Sarah Mitchell",
            role:
                "Founder, Northbridge Group"
        },

        {
            quote:
                "The team combines technical legal expertise with a strong understanding of business.",
            name:
                "James Carter",
            role:
                "Managing Director, Apex Holdings"
        }

    ];

    let currentQuote = 0;

    const quoteText =
        document.getElementById("quoteText");

    const quoteName =
        document.getElementById("quoteName");

    const quoteRole =
        document.getElementById("quoteRole");

    const quoteCurrent =
        document.getElementById("quoteCurrent");

    const quotePrev =
        document.getElementById("quotePrev");

    const quoteNext =
        document.getElementById("quoteNext");


    function showQuote(index, direction = 1) {

        currentQuote =
            (index + testimonials.length) %
            testimonials.length;

        const item =
            testimonials[currentQuote];

        if (typeof gsap !== "undefined") {

            gsap.to(
                [
                    quoteText,
                    quoteName,
                    quoteRole
                ],
                {
                    opacity: 0,
                    y: direction * 15,
                    duration: .25,
                    onComplete: () => {

                        quoteText.textContent =
                            item.quote;

                        quoteName.textContent =
                            item.name;

                        quoteRole.textContent =
                            item.role;

                        quoteCurrent.textContent =
                            String(currentQuote + 1)
                                .padStart(2, "0");

                        gsap.fromTo(
                            [
                                quoteText,
                                quoteName,
                                quoteRole
                            ],
                            {
                                opacity: 0,
                                y: -direction * 15
                            },
                            {
                                opacity: 1,
                                y: 0,
                                duration: .4,
                                stagger: .05,
                                ease: "power2.out"
                            }
                        );

                    }
                }
            );

        } else {

            quoteText.textContent = item.quote;
            quoteName.textContent = item.name;
            quoteRole.textContent = item.role;

            quoteCurrent.textContent =
                String(currentQuote + 1).padStart(2, "0");

        }

    }


    quotePrev?.addEventListener("click", () => {

        showQuote(currentQuote - 1, -1);

    });


    quoteNext?.addEventListener("click", () => {

        showQuote(currentQuote + 1, 1);

    });


    /* =================================================
       AUTO TESTIMONIAL
    ================================================= */

    let testimonialTimer =
        setInterval(() => {

            showQuote(currentQuote + 1, 1);

        }, 7000);


    [quotePrev, quoteNext].forEach(button => {

        button?.addEventListener("click", () => {

            clearInterval(testimonialTimer);

            testimonialTimer =
                setInterval(() => {

                    showQuote(currentQuote + 1, 1);

                }, 7000);

        });

    });


    /* =================================================
       IMAGE PARALLAX
    ================================================= */

    const heroImage =
        document.querySelector(".hero-main-image img");

    window.addEventListener("scroll", () => {

        if (!heroImage) return;

        const scroll =
            Math.min(window.scrollY * .04, 25);

        heroImage.style.transform =
            `scale(1.03) translateY(${scroll}px)`;

    });


    /* =================================================
       ESCAPE — CLOSE MENU
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            mainNav?.classList.remove("active");

            menuToggle?.classList.remove("active");

        }

    });

});