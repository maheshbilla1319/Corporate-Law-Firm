/* =========================================
   STERLING & CO. LAW FIRM
   LOGIN JAVASCRIPT
========================================= */


/* =========================================
   AOS
========================================= */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 60
    });

}


/* =========================================
   ELEMENTS
========================================= */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const roleInputs =
    document.querySelectorAll('input[name="role"]');

const loginButton =
    document.querySelector(".login-btn");


/* =========================================
   PASSWORD TOGGLE
========================================= */

if (passwordToggle && passwordInput) {

    passwordToggle.addEventListener("click", function () {

        const isPassword =
            passwordInput.type === "password";

        passwordInput.type =
            isPassword ? "text" : "password";

        const icon =
            passwordToggle.querySelector("i");

        if (isPassword) {

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}


/* =========================================
   ERROR FUNCTION
========================================= */

function setError(elementId, message) {

    const errorElement =
        document.getElementById(elementId);

    if (errorElement) {
        errorElement.textContent = message;
    }

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    setError("emailError", "");
    setError("passwordError", "");
    setError("roleError", "");

}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/* =========================================
   FORM SUBMIT
========================================= */

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();

        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );

        let isValid = true;


        /* Email */

        if (!email) {

            setError(
                "emailError",
                "Please enter your email address."
            );

            isValid = false;

        } else if (!isValidEmail(email)) {

            setError(
                "emailError",
                "Please enter a valid email address."
            );

            isValid = false;

        }


        /* Password */

        if (!password) {

            setError(
                "passwordError",
                "Please enter your password."
            );

            isValid = false;

        } else if (password.length < 6) {

            setError(
                "passwordError",
                "Password must be at least 6 characters."
            );

            isValid = false;

        }


        /* Role */

        if (!selectedRole) {

            setError(
                "roleError",
                "Please select your login role."
            );

            isValid = false;

        }


        /* Stop if validation fails */

        if (!isValid) {
            return;
        }


        /* Loading */

        loginButton.classList.add("loading");

        loginButton.querySelector("span").textContent =
            "Signing In";

        loginButton.querySelector("i").className =
            "fa-solid fa-spinner fa-spin";


        /* Demo Login */

        setTimeout(function () {

            const roleName =
                selectedRole.value.charAt(0).toUpperCase() +
                selectedRole.value.slice(1);


            /* Reset Button */

            loginButton.classList.remove("loading");

            loginButton.querySelector("span").textContent =
                "Sign In";

            loginButton.querySelector("i").className =
                "fa-solid fa-arrow-right";


            /* =========================================
               ROLE-BASED DASHBOARD REDIRECT
            ========================================= */

            if (selectedRole.value === "lawyer") {

                window.location.href = "lawyer.html";

            } else if (selectedRole.value === "admin") {

                window.location.href = "admin.html";

            } else if (selectedRole.value === "client") {

                window.location.href = "client.html";

            }

        }, 900);

    });

}



/* =========================================
   LIVE ERROR CLEAR
========================================= */

if (emailInput) {

    emailInput.addEventListener("input", function () {

        setError("emailError", "");

    });

}


if (passwordInput) {

    passwordInput.addEventListener("input", function () {

        setError("passwordError", "");

    });

}


/* =========================================
   ROLE ERROR CLEAR
========================================= */

roleInputs.forEach(function (role) {

    role.addEventListener("change", function () {

        setError("roleError", "");

    });

});