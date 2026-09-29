/* =====================================================
   STERLING & CO. LAW FIRM
   404 PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   AOS INITIALIZATION
===================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 70
    });

}


/* =====================================================
   PREVIOUS PAGE
===================================================== */

const previousPageBtn =
    document.getElementById("previousPageBtn");


function goToPreviousPage() {

    const referrer = document.referrer;

    /*
     * Check whether the previous page belongs
     * to the same website.
     */

    if (referrer) {

        try {

            const previousUrl =
                new URL(referrer);

            if (
                previousUrl.origin === window.location.origin
            ) {

                window.history.back();

                return;
            }

        } catch (error) {

            console.warn(
                "Unable to read previous page.",
                error
            );

        }

    }


    /*
     * If there is no same-site history,
     * safely return to home.
     */

    window.location.href = "index.html";

}


if (previousPageBtn) {

    /*
     * Disable button when there is no
     * same-site previous page.
     */

    const referrer = document.referrer;

    let hasPreviousPage = false;


    if (referrer) {

        try {

            const previousUrl =
                new URL(referrer);

            hasPreviousPage =
                previousUrl.origin === window.location.origin;

        } catch (error) {

            hasPreviousPage = false;

        }

    }


    if (!hasPreviousPage) {

        previousPageBtn.classList.add("disabled");

        previousPageBtn.setAttribute(
            "aria-disabled",
            "true"
        );

    }


    previousPageBtn.addEventListener(
        "click",
        goToPreviousPage
    );

}


/* =====================================================
   ALT + LEFT ARROW
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.altKey &&
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            goToPreviousPage();

        }

    }
);


/* =====================================================
   404 VISUAL PARALLAX
===================================================== */

const visual =
    document.querySelector(".error-visual");


if (visual) {

    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;


    if (!isTouchDevice) {

        const frame =
            visual.querySelector(".visual-frame");

        const cardOne =
            visual.querySelector(".card-one");

        const cardTwo =
            visual.querySelector(".card-two");


        visual.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;


                if (frame) {

                    frame.style.transform =
                        `perspective(900px)
                         rotateY(${x * 4}deg)
                         rotateX(${y * -4}deg)`;

                }


                if (cardOne) {

                    cardOne.style.transform =
                        `translate(${x * -12}px, ${y * -12}px)`;

                }


                if (cardTwo) {

                    cardTwo.style.transform =
                        `translate(${x * 12}px, ${y * 12}px)`;

                }

            }
        );


        visual.addEventListener(
            "mouseleave",
            function () {

                if (frame) {
                    frame.style.transform = "";
                }


                if (cardOne) {
                    cardOne.style.transform = "";
                }


                if (cardTwo) {
                    cardTwo.style.transform = "";
                }

            }
        );

    }

}


/* =====================================================
   QUICK LINK CLICK ANIMATION
===================================================== */

const quickLinks =
    document.querySelectorAll(".quick-links a");


quickLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            link.classList.add("clicked");

        }
    );

});


/* =====================================================
   PREVIOUS BUTTON HOVER ACCESSIBILITY
===================================================== */

if (previousPageBtn) {

    previousPageBtn.addEventListener(
        "mouseenter",
        function () {

            if (
                !previousPageBtn.classList.contains(
                    "disabled"
                )
            ) {

                previousPageBtn.setAttribute(
                    "aria-label",
                    "Return to the previous page"
                );

            }

        }
    );

}


/* =====================================================
   CONSOLE INFORMATION
===================================================== */

console.info(
    "Sterling & Co. Law Firm - 404 Page Loaded"
);