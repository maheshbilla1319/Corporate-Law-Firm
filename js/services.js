/* =====================================================
   STERLING LAW — SERVICES PAGE JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });

    }


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");

    if (menuToggle && nav) {

        function openMenu() {

            nav.classList.add("active");
            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            menuToggle.setAttribute(
                "title",
                "Close navigation menu"
            );

            document.body.classList.add("menu-open");
        }


        function closeMenu() {

            nav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.setAttribute(
                "title",
                "Open navigation menu"
            );

            document.body.classList.remove("menu-open");
        }


        menuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    nav.classList.contains("active");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );


        /* Close when clicking navigation */

        const navLinks =
            nav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });


        /* Escape */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeMenu();
                }

            }
        );


        /* Resize */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 800) {
                    closeMenu();
                }

            }
        );

    }


    /* =================================================
       HEADER SCROLL EFFECT
    ================================================= */

    const header =
        document.getElementById("siteHeader");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* =================================================
       ACTIVE NAV
    ================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const navLinks =
        document.querySelectorAll(
            ".main-nav > a"
        );

    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }

    });


    /* =================================================
       FAQ
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        if (!question) {
            return;
        }

        question.addEventListener(
            "click",
            function () {

                const isActive =
                    item.classList.contains("active");


                faqItems.forEach(
                    function (otherItem) {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherQuestion =
                            otherItem.querySelector(
                                ".faq-question"
                            );

                        if (otherQuestion) {

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );


                if (!isActive) {

                    item.classList.add("active");

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });


    /* =================================================
       IMAGE LOAD
    ================================================= */

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        if (image.complete) {

            image.classList.add("loaded");

        } else {

            image.addEventListener(
                "load",
                function () {

                    image.classList.add("loaded");

                },
                {
                    once: true
                }
            );

        }

    });


    /* =================================================
       SMOOTH ANCHOR
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =================================================
       COUNTER
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".counter[data-target]"
        );

    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.target
                            );

                        const duration = 1600;

                        const startTime =
                            performance.now();

                        function animateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) / duration,
                                    1
                                );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            counter.textContent =
                                Math.floor(
                                    eased * target
                                );

                            if (progress < 1) {

                                requestAnimationFrame(
                                    animateCounter
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        }

                        requestAnimationFrame(
                            animateCounter
                        );

                        observer.unobserve(counter);

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    }


    /* =================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !nav ||
                !menuToggle
            ) {
                return;
            }

            if (
                window.innerWidth <= 800 &&
                nav.classList.contains("active") &&
                !nav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                nav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.setAttribute(
                    "title",
                    "Open navigation menu"
                );

            }

        }
    );

});