/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.querySelector(".loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 1700);

});


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });

    });

}


/* =========================
   SCROLL REVEAL
========================= */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


/* =========================
   NAVBAR
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursor) {

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;

    }

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    if (cursorRing) {

        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;

    }

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================
   BUTTON HOVER
========================= */

document.querySelectorAll(".button, .nav-button").forEach(button => {

    button.addEventListener("mouseenter", () => {

        if (cursorRing) {

            cursorRing.style.width = "60px";
            cursorRing.style.height = "60px";

        }

    });

    button.addEventListener("mouseleave", () => {

        if (cursorRing) {

            cursorRing.style.width = "35px";
            cursorRing.style.height = "35px";

        }

    });

});


/* =========================
   HERO PARALLAX
========================= */

const heroBackground = document.querySelector(".hero-background");

window.addEventListener("mousemove", event => {

    if (!heroBackground || window.innerWidth < 800) {
        return;
    }

    const x =
        (event.clientX / window.innerWidth - 0.5) * 18;

    const y =
        (event.clientY / window.innerHeight - 0.5) * 18;

    heroBackground.style.transform =
        `scale(1.05) translate(${x}px, ${y}px)`;

});


/* =========================
   SERVICE CARD EFFECT
========================= */

document.querySelectorAll(".service-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.background =
            `radial-gradient(
                circle at ${x}px ${y}px,
                rgba(22,140,255,.10),
                transparent 40%
            )`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background = "";

    });

});


/* =========================
   CURRENT YEAR
========================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}