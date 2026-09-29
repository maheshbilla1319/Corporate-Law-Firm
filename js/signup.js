/* =====================================================
   STERLING & CO. LAW FIRM
   SIGNUP PAGE JAVASCRIPT
===================================================== */


/* =====================================================
   AOS
===================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 60
    });

}


/* =====================================================
   ELEMENTS
===================================================== */

const signupForm =
    document.getElementById("signupForm");

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const phone =
    document.getElementById("phone");

const password =
    document.getElementById("password");

const confirmPassword =
    document.getElementById("confirmPassword");

const terms =
    document.getElementById("terms");


/* =====================================================
   PASSWORD TOGGLE
===================================================== */

function passwordToggle(buttonId, inputId) {

    const button =
        document.getElementById(buttonId);

    const input =
        document.getElementById(inputId);


    if (!button || !input) {
        return;
    }


    button.addEventListener("click", function () {

        const icon =
            button.querySelector("i");


        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

            button.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

            button.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

}


passwordToggle(
    "passwordToggle",
    "password"
);


passwordToggle(
    "confirmPasswordToggle",
    "confirmPassword"
);


/* =====================================================
   ERROR FUNCTION
===================================================== */

function setError(
    errorElement,
    inputElement,
    message
) {

    errorElement.textContent = message;

    if (inputElement) {
        inputElement.classList.add("input-error");
    }

}


function clearError(
    errorElement,
    inputElement
) {

    errorElement.textContent = "";

    if (inputElement) {
        inputElement.classList.remove("input-error");
    }

}


/* =====================================================
   FORM SUBMIT
===================================================== */

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Errors */

            const nameError =
                document.getElementById("nameError");

            const emailError =
                document.getElementById("emailError");

            const phoneError =
                document.getElementById("phoneError");

            const roleError =
                document.getElementById("roleError");

            const passwordError =
                document.getElementById("passwordError");

            const confirmPasswordError =
                document.getElementById(
                    "confirmPasswordError"
                );

            const termsError =
                document.getElementById("termsError");


            /* Clear previous errors */

            clearError(
                nameError,
                fullName
            );

            clearError(
                emailError,
                email
            );

            clearError(
                phoneError,
                phone
            );

            clearError(
                passwordError,
                password
            );

            clearError(
                confirmPasswordError,
                confirmPassword
            );

            roleError.textContent = "";

            termsError.textContent = "";


            let valid = true;


            /* =================================================
               NAME
            ================================================= */

            const nameValue =
                fullName.value.trim();


            if (nameValue.length < 3) {

                setError(
                    nameError,
                    fullName,
                    "Please enter your full name."
                );

                valid = false;

            }


            /* =================================================
               EMAIL
            ================================================= */

            const emailValue =
                email.value.trim();


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(emailValue)) {

                setError(
                    emailError,
                    email,
                    "Please enter a valid email address."
                );

                valid = false;

            }


            /* =================================================
               PHONE
            ================================================= */

            const phoneValue =
                phone.value.trim();


            const phonePattern =
                /^[0-9+\-\s()]{10,15}$/;


            if (!phonePattern.test(phoneValue)) {

                setError(
                    phoneError,
                    phone,
                    "Please enter a valid phone number."
                );

                valid = false;

            }


            /* =================================================
               ROLE
            ================================================= */

            const selectedRole =
                document.querySelector(
                    'input[name="role"]:checked'
                );


            if (!selectedRole) {

                roleError.textContent =
                    "Please select a role.";

                valid = false;

            }


            /* =================================================
               PASSWORD
            ================================================= */

            if (password.value.length < 6) {

                setError(
                    passwordError,
                    password,
                    "Password must contain at least 6 characters."
                );

                valid = false;

            }


            /* =================================================
               CONFIRM PASSWORD
            ================================================= */

            if (
                confirmPassword.value !==
                password.value
            ) {

                setError(
                    confirmPasswordError,
                    confirmPassword,
                    "Passwords do not match."
                );

                valid = false;

            }


            /* =================================================
               TERMS
            ================================================= */

            if (!terms.checked) {

                termsError.textContent =
                    "Please accept the Terms & Conditions.";

                valid = false;

            }


            /* =================================================
               SUCCESS
            ================================================= */
if (valid) {

    const selectedRoleName =
        selectedRole.value;

    /* Reset form after successful
       frontend validation. */

    signupForm.reset();

    /* Redirect to login page */
    window.location.href = "login.html";

}

        }
    );

}


/* =====================================================
   LIVE INPUT VALIDATION
===================================================== */

const inputs = [
    fullName,
    email,
    phone,
    password,
    confirmPassword
];


inputs.forEach(function (input) {

    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            input.classList.remove(
                "input-error"
            );


            const error =
                document.getElementById(
                    input.id + "Error"
                );


            if (error) {
                error.textContent = "";
            }

        }
    );

});


/* =====================================================
   ROLE ERROR CLEAR
===================================================== */

const roles =
    document.querySelectorAll(
        'input[name="role"]'
    );


roles.forEach(function (role) {

    role.addEventListener(
        "change",
        function () {

            const roleError =
                document.getElementById(
                    "roleError"
                );

            roleError.textContent = "";

        }
    );

});


/* =====================================================
   TERMS ERROR CLEAR
===================================================== */

if (terms) {

    terms.addEventListener(
        "change",
        function () {

            const termsError =
                document.getElementById(
                    "termsError"
                );

            termsError.textContent = "";

        }
    );

}