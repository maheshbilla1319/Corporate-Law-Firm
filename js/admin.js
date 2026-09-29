/* =====================================================
   STERLING LAW — ADMIN DASHBOARD JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


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
       ELEMENTS
    ================================================= */

    const sidebar =
        document.getElementById("adminSidebar");

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const adminHeader =
        document.querySelector(".admin-header");


    /* =================================================
       SIDEBAR OPEN
    ================================================= */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

        document.body.classList.add("sidebar-open");


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close sidebar"
            );

            menuToggle.setAttribute(
                "title",
                "Close sidebar"
            );


            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

        }

    }


    /* =================================================
       SIDEBAR CLOSE
    ================================================= */

    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        document.body.classList.remove(
            "sidebar-open"
        );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open sidebar"
            );

            menuToggle.setAttribute(
                "title",
                "Open sidebar"
            );


            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }


    /* =================================================
       MENU TOGGLE
    ================================================= */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                if (
                    sidebar &&
                    sidebar.classList.contains("open")
                ) {

                    closeSidebar();

                } else {

                    openSidebar();

                }

            }
        );

    }


    /* =================================================
       CLOSE BUTTON
    ================================================= */

    if (sidebarClose) {

        sidebarClose.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =================================================
       OVERLAY
    ================================================= */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =================================================
       SECTION NAVIGATION
       
       Dashboard
       Cases
       Clients
       Attorneys
       Appointments
       Documents
       Reports
       Settings
    ================================================= */

    const navigationLinks =
        document.querySelectorAll(
            "[data-section]"
        );


    const sections =
        document.querySelectorAll(
            "[data-section-target]"
        );


    function activateNavigation(
        sectionName
    ) {

        document
            .querySelectorAll(".sidebar-link")
            .forEach(link => {

                link.classList.remove(
                    "active"
                );

            });


        const activeLink =
            document.querySelector(
                `.sidebar-link[data-section="${sectionName}"]`
            );


        if (activeLink) {

            activeLink.classList.add(
                "active"
            );

        }

    }


    function goToSection(
        sectionName
    ) {

        const target =
            document.querySelector(
                `[data-section-target="${sectionName}"]`
            );


        if (!target) {

            const fallback =
                document.getElementById(
                    sectionName
                );

            if (!fallback) return;

            fallback.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            return;

        }


        activateNavigation(
            sectionName
        );


        const headerHeight =
            adminHeader
                ? adminHeader.offsetHeight
                : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            25;


        window.scrollTo({

            top: Math.max(
                0,
                targetPosition
            ),

            behavior: "smooth"

        });


        /* Refresh AOS */

        setTimeout(() => {

            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }, 500);

    }


    /* =================================================
       SIDEBAR LINK CLICK
    ================================================= */

    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const sectionName =
                    link.getAttribute(
                        "data-section"
                    );


                if (!sectionName) {
                    return;
                }


                event.preventDefault();


                goToSection(
                    sectionName
                );


                /*
                   Mobile:
                   Section ki vellina tarvata
                   sidebar close avutundi.
                */

                if (
                    window.innerWidth <= 796 &&
                    link.classList.contains(
                        "sidebar-link"
                    )
                ) {

                    setTimeout(
                        closeSidebar,
                        250
                    );

                }

            }
        );

    });


    /* =================================================
       ACTIVE SECTION ON SCROLL
    ================================================= */

    if (sections.length) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const sectionName =
                            entry.target.getAttribute(
                                "data-section-target"
                            );


                        if (sectionName) {

                            activateNavigation(
                                sectionName
                            );

                        }

                    });

                },
                {
                    root: null,

                    rootMargin:
                        "-18% 0px -65% 0px",

                    threshold: 0
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =================================================
       COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
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


                        if (
                            Number.isNaN(target)
                        ) {
                            return;
                        }


                        const duration =
                            1500;


                        const startTime =
                            performance.now();


                        function animate(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        startTime
                                    ) /
                                    duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const value =
                                Math.floor(
                                    eased * target
                                );


                            counter.textContent =
                                value.toLocaleString();


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                counter.textContent =
                                    target.toLocaleString();

                            }

                        }


                        requestAnimationFrame(
                            animate
                        );


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

            counterObserver.observe(
                counter
            );

        });

    }


    /* =================================================
       NOTIFICATION
    ================================================= */

    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                /*
                   Notification click
                   reports section ki move avutundi.
                */

                goToSection(
                    "reports"
                );

            }
        );

    }


    /* =================================================
       LOGOUT
    ================================================= */

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            event => {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) {

                    event.preventDefault();

                    return;

                }


                /*
                   Confirm ayithe login.html
                   ki velthundi.
                */

                window.location.href =
                    "login.html";

            }
        );

    }


    /* =================================================
       HEADER SCROLL
    ================================================= */

    if (adminHeader) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 20
                ) {

                    adminHeader.classList.add(
                        "scrolled"
                    );

                } else {

                    adminHeader.classList.remove(
                        "scrolled"
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* =================================================
       IMAGE LOAD
    ================================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (image.complete) {

                image.classList.add(
                    "loaded"
                );

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    },
                    {
                        once: true
                    }
                );

            }

        });


    /* =================================================
       RESIZE
    ================================================= */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 796
            ) {

                closeSidebar();

            }

        }
    );


    /* =================================================
       INITIAL ACTIVE STATE
    ================================================= */

    activateNavigation(
        "dashboard"
    );


});



/* =====================================================
   STERLING LAW — MOBILE SIDEBAR + LOGO JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("adminSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const adminLogo = document.querySelector(".admin-logo");

    /* ================================================
       OPEN SIDEBAR
    ================================================ */

    function openSidebar() {
        if (!sidebar) return;

        sidebar.classList.add("open");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("sidebar-open");
    }


    /* ================================================
       CLOSE SIDEBAR
    ================================================ */

    function closeSidebar() {
        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("sidebar-open");
    }


    /* ================================================
       MOBILE MENU BUTTON
    ================================================ */

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            if (sidebar.classList.contains("open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }


    /* ================================================
       CLOSE BUTTON
    ================================================ */

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar);
    }


    /* ================================================
       OVERLAY CLICK
    ================================================ */

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }


    /* ================================================
       LOGO CLICK
       Dashboard + Close Mobile Sidebar
    ================================================ */

    if (adminLogo) {
        adminLogo.addEventListener("click", () => {

            closeSidebar();

            const dashboard = document.getElementById("dashboard");

            if (dashboard) {
                setTimeout(() => {
                    dashboard.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 100);
            }

        });
    }


    /* ================================================
       SIDEBAR LINKS
       CLOSE SIDEBAR AFTER CLICK
    ================================================ */

    const sidebarLinks = document.querySelectorAll(
        ".sidebar-link, .sidebar-nav a"
    );

    sidebarLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 796) {
                closeSidebar();
            }

        });

    });


    /* ================================================
       ESC KEY
    ================================================ */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSidebar();
        }

    });


    /* ================================================
       RESIZE FIX
       Prevent Mobile Sidebar State From Breaking
    ================================================ */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 796) {
            closeSidebar();
        }

    });

});