
/* =====================================================
   STERLING LAW — LAWYER DASHBOARD JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       AOS
    ================================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 1000,
            easing: "ease-out-cubic",
            once: true,
            offset: 70
        });

    }


    /* =================================================
       SIDEBAR ELEMENTS
    ================================================= */

    const sidebar =
        document.getElementById("dashboardSidebar");

    const menuToggle =
        document.getElementById("menuToggle");

    const sidebarClose =
        document.getElementById("sidebarClose");

    const overlay =
        document.getElementById("sidebarOverlay");


    /* =================================================
       OPEN SIDEBAR
    ================================================= */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("sidebar-open");


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close dashboard menu"
            );

            menuToggle.setAttribute(
                "title",
                "Close dashboard menu"
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
       CLOSE SIDEBAR
    ================================================= */

    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("active");
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
                "Open dashboard menu"
            );

            menuToggle.setAttribute(
                "title",
                "Open dashboard menu"
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

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =================================================
       SECTION NAVIGATION
       
       Sidebar click:
       Dashboard
       My Cases
       Clients
       Appointments
       Documents
       Messages
       Analytics
       Settings
       Support
    ================================================= */

    const navigationLinks =
        document.querySelectorAll(
            "[data-section]"
        );


    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const sectionName =
                    link.dataset.section;

                if (!sectionName) {
                    return;
                }


                const target =
                    document.getElementById(
                        sectionName
                    );


                if (!target) {
                    return;
                }


                /*
                    Prevent normal # link jump
                    and create smooth scroll.
                */

                event.preventDefault();


                /*
                    Update active sidebar item
                */

                const sidebarLinks =
                    document.querySelectorAll(
                        ".dashboard-link"
                    );


                sidebarLinks.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                if (
                    link.classList.contains(
                        "dashboard-link"
                    )
                ) {

                    link.classList.add(
                        "active"
                    );

                }


                /*
                    Smooth scroll
                */

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                    On mobile close sidebar
                    after selecting a section.
                */

                if (
                    window.innerWidth <= 796 &&
                    link.classList.contains(
                        "dashboard-link"
                    )
                ) {

                    closeSidebar();

                }

            }
        );

    });


    /* =================================================
       ESC KEY
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
       RESIZE
    ================================================= */

    let previousWidth =
        window.innerWidth;


    window.addEventListener(
        "resize",
        () => {

            const currentWidth =
                window.innerWidth;


            if (
                previousWidth <= 796 &&
                currentWidth > 796
            ) {

                closeSidebar();

            }


            previousWidth =
                currentWidth;

        }
    );


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    if (counters.length) {

        const observer =
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
                                counter.dataset.target
                            );


                        const duration =
                            1400;


                        const start =
                            performance.now();


                        function animate(time) {

                            const progress =
                                Math.min(
                                    (time - start) /
                                    duration,
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


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animate
                                );

                            } else {

                                counter.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            animate
                        );


                        observer.unobserve(
                            counter
                        );

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            observer.observe(counter);

        });

    }


    /* =================================================
       LOGOUT
    ================================================= */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    window.location.href =
                        "login.html";

                }

            }
        );

    }


    /* =================================================
       NOTIFICATION
    ================================================= */

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );


    if (notificationBtn) {

        notificationBtn.addEventListener(
            "click",
            () => {

                const messagesSection =
                    document.getElementById(
                        "messages"
                    );


                if (messagesSection) {

                    messagesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const dashboardHeader =
        document.querySelector(
            ".dashboard-header"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (!dashboardHeader) {
                return;
            }


            if (window.scrollY > 30) {

                dashboardHeader.classList.add(
                    "header-scrolled"
                );

            } else {

                dashboardHeader.classList.remove(
                    "header-scrolled"
                );

            }

        },
        {
            passive: true
        }
    );


    /* =================================================
       ACTIVE SECTION ON SCROLL
    ================================================= */

    const trackedSections = [
        "dashboard",
        "my-cases",
        "appointments",
        "analytics",
        "clients",
        "documents",
        "messages",
        "settings",
        "support"
    ];


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {

                        return;

                    }


                    const sectionId =
                        entry.target.id;


                    const matchingLink =
                        document.querySelector(
                            `.dashboard-link[data-section="${sectionId}"]`
                        );


                    if (!matchingLink) {
                        return;
                    }


                    document
                        .querySelectorAll(
                            ".dashboard-link"
                        )
                        .forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                        });


                    matchingLink.classList.add(
                        "active"
                    );

                });

            },
            {
                rootMargin:
                    "-20% 0px -65% 0px",
                threshold: 0
            }
        );


    trackedSections.forEach(sectionId => {

        const section =
            document.getElementById(
                sectionId
            );


        if (section) {

            sectionObserver.observe(
                section
            );

        }

    });

});

