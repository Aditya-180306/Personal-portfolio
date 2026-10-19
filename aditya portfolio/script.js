/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   THEME TOGGLE
========================================= */

const themeToggle = document.getElementById("theme-toggle");

function updateThemeButton() {

    if (!themeToggle) {
        return;
    }

    const lightMode =
        document.documentElement.classList.contains("light-mode");

    if (lightMode) {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

    } else {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );
    }
}


updateThemeButton();


if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        const isLightMode =
            document.documentElement.classList.toggle("light-mode");

        localStorage.setItem(
            "portfolio-theme",
            isLightMode ? "light" : "dark"
        );

        updateThemeButton();

    });

}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const menuOpen =
            navLinks.classList.contains("show");

        menuToggle.setAttribute(
            "aria-expanded",
            menuOpen ? "true" : "false"
        );

        menuToggle.textContent =
            menuOpen ? "✕" : "☰";

    });


    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 150;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                const target =
                    parseFloat(
                        counter.getAttribute("data-target")
                    );

                let current = 0;

                const duration = 1200;

                const startTime = performance.now();


                function animateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );

                    current =
                        target * progress;


                    if (target % 1 !== 0) {

                        counter.textContent =
                            current.toFixed(1);

                    } else {

                        counter.textContent =
                            Math.floor(current);

                    }


                    if (progress < 1) {

                        requestAnimationFrame(
                            animateCounter
                        );

                    } else {

                        counter.textContent =
                            target % 1 !== 0
                                ? target.toFixed(1)
                                : target;

                    }

                }


                requestAnimationFrame(
                    animateCounter
                );

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.6
        }
    );


counters.forEach(function (counter) {

    counterObserver.observe(counter);

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("back-to-top");


if (backToTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   COPY EMAIL
========================================= */

const copyEmailButton =
    document.getElementById("copy-email");

const copyMessage =
    document.getElementById("copy-message");


if (copyEmailButton) {

    copyEmailButton.addEventListener(
        "click",
        async function () {

            const email =
                "vynojuaditya@gmail.com";


            try {

                await navigator.clipboard.writeText(
                    email
                );


                copyEmailButton.textContent =
                    "✓ Copied";


                if (copyMessage) {

                    copyMessage.textContent =
                        "Email copied! ✓";

                }


                setTimeout(
                    function () {

                        copyEmailButton.textContent =
                            "📋 Copy Email";

                        if (copyMessage) {

                            copyMessage.textContent =
                                "";

                        }

                    },
                    2500
                );


            } catch (error) {

                if (copyMessage) {

                    copyMessage.textContent =
                        "Unable to copy email.";

                }

            }

        }
    );

}


/* =========================================
   FORMSPREE CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Sending...";

            }


            if (formMessage) {

                formMessage.textContent = "";

            }


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body:
                                new FormData(
                                    contactForm
                                ),

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your message has been sent successfully.";

                        formMessage.className =
                            "form-message success-message";

                    }


                    contactForm.reset();


                } else {

                    throw new Error(
                        "Form submission failed"
                    );

                }


            } catch (error) {

                if (formMessage) {

                    formMessage.textContent =
                        "Something went wrong. Please try again or email me directly.";

                    formMessage.className =
                        "form-message error-message";

                }

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Send Message";

                }

            }

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("current-year");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   EMPTY PROJECT LINKS
========================================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });


/* =========================================
   BROWSER THEME COLOR
========================================= */

function updateBrowserThemeColor() {

    let meta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    if (!meta) {

        meta =
            document.createElement("meta");

        meta.name = "theme-color";

        document.head.appendChild(meta);

    }


    const lightMode =
        document.documentElement.classList.contains(
            "light-mode"
        );


    meta.setAttribute(
        "content",
        lightMode
            ? "#f5f9fc"
            : "#020811"
    );

}


updateBrowserThemeColor();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        updateBrowserThemeColor
    );

}
/* =========================================
   CUSTOM CURSOR
========================================= */

(function () {

    const finePointer =
        window.matchMedia("(pointer: fine)");

    if (!finePointer.matches) {
        return;
    }


    /* Create cursor elements */

    const cursorDot =
        document.createElement("div");

    cursorDot.className =
        "cursor-dot";


    const cursorRing =
        document.createElement("div");

    cursorRing.className =
        "cursor-ring";


    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    document.body.classList.add(
        "cursor-enabled"
    );


    /* Mouse positions */

    let mouseX = -100;
    let mouseY = -100;

    let ringX = -100;
    let ringY = -100;


    /* Follow mouse */

    window.addEventListener(
        "mousemove",
        function (event) {

            mouseX = event.clientX;
            mouseY = event.clientY;


            cursorDot.style.left =
                mouseX + "px";

            cursorDot.style.top =
                mouseY + "px";


            document.body.classList.add(
                "cursor-visible"
            );

        }
    );


    /* Smooth ring animation */

    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.16;

        ringY +=
            (mouseY - ringY) * 0.16;


        cursorRing.style.left =
            ringX + "px";

        cursorRing.style.top =
            ringY + "px";


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* Interactive elements */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea, select, " +
            ".skill-card, " +
            ".service-card, " +
            ".project-card, " +
            ".certification-card, " +
            ".highlight-card, " +
            ".ai-tool-card, " +
            ".stat-card"
        );


    interactiveElements.forEach(
        function (element) {

            element.addEventListener(
                "mouseenter",
                function () {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                function () {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        }
    );


    /* Click animation */

    document.addEventListener(
        "mousedown",
        function () {

            document.body.classList.add(
                "cursor-click"
            );

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            document.body.classList.remove(
                "cursor-click"
            );

        }
    );


    /* Hide when mouse leaves page */

    document.addEventListener(
        "mouseleave",
        function () {

            document.body.classList.remove(
                "cursor-visible"
            );

        }
    );


    document.addEventListener(
        "mouseenter",
        function () {

            document.body.classList.add(
                "cursor-visible"
            );

        }
    );

})();
/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-text, " +
    ".highlight-card, " +
    ".service-card, " +
    ".skill-category, " +
    ".skill-card, " +
    ".ai-main-skill, " +
    ".ai-tool-card, " +
    ".timeline-item, " +
    ".project-card, " +
    ".certification-card, " +
    ".contact-card, " +
    ".contact-form, " +
    ".resume-content"
);


/*
   Automatically add the reveal class
   to the selected elements.
*/

revealElements.forEach(function (element) {

    element.classList.add("reveal");

});


/*
   Observe elements when they enter
   the visible area of the screen.
*/

const revealObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.15
    }
);


/*
   Start observing every reveal element.
*/

revealElements.forEach(function (element) {

    revealObserver.observe(element);

});