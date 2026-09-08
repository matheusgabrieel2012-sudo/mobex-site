/* =========================================================
   MOBEX — EXECUTIVE MOBILITY
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const hero = document.querySelector(".hero");
    const heroGrid = document.querySelector(".hero-grid");
    const heroCar = document.querySelector(".hero-car");

    const revealElements = document.querySelectorAll(".reveal");

    const navLinks = document.querySelectorAll(
        ".nav-link"
    );

    const mobileLinks = document.querySelectorAll(
        ".mobile-menu a"
    );

    const chartColumns = document.querySelectorAll(
        ".chart-column"
    );

    const yearElement = document.getElementById(
        "currentYear"
    );


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader?.classList.add("hide");

        }, 900);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const handleHeader = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    handleHeader();

    window.addEventListener(
        "scroll",
        handleHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );

            const bars =
                menuToggle.querySelectorAll("span");

            if (isOpen) {

                bars[0].style.transform =
                    "translateY(6px) rotate(45deg)";

                bars[1].style.opacity =
                    "0";

                bars[2].style.transform =
                    "translateY(-6px) rotate(-45deg)";

            } else {

                bars.forEach((bar) => {

                    bar.style.transform =
                        "";

                    bar.style.opacity =
                        "";

                });

            }

        });

    }


    /* =====================================================
       FECHAR MENU AO CLICAR
    ===================================================== */

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu?.classList.remove(
                "active"
            );

            menuToggle?.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "no-scroll"
            );

            const bars =
                menuToggle?.querySelectorAll(
                    "span"
                );

            bars?.forEach((bar) => {

                bar.style.transform = "";
                bar.style.opacity = "";

            });

        });

    });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -35px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = [
        ...document.querySelectorAll(
            "section[id]"
        )
    ];

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + 180;

        let currentId = "";

        sections.forEach((section) => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentId =
                    section.getAttribute(
                        "id"
                    );

            }

        });

        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentId}`
            );

        });

    };

    updateActiveNav();

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

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
                        header?.offsetHeight ||
                        0;

                    const targetTop =
                        target.offsetTop -
                        headerHeight +
                        1;

                    window.scrollTo({
                        top: targetTop,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       HERO MOUSE GRID
    ===================================================== */

    if (
        hero &&
        heroGrid &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const percentX =
                    (x / rect.width) *
                    100;

                const percentY =
                    (y / rect.height) *
                    100;

                heroGrid.style.setProperty(
                    "--mouse-x",
                    `${percentX}%`
                );

                heroGrid.style.setProperty(
                    "--mouse-y",
                    `${percentY}%`
                );

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroGrid.style.setProperty(
                    "--mouse-x",
                    "50%"
                );

                heroGrid.style.setProperty(
                    "--mouse-y",
                    "50%"
                );

            }
        );

    }


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    if (
        hero &&
        heroCar &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const moveX =
                    ((x / rect.width) - .5)
                    * 12;

                const moveY =
                    ((y / rect.height) - .5)
                    * 8;

                heroCar.style.transform =
                    `translate3d(${moveX}px, ${moveY}px, 0)`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroCar.style.transform =
                    "translate3d(0,0,0)";

            }
        );

    }


    /* =====================================================
       SERVICE CARD TILT
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        serviceCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateX =
                        ((y / rect.height) - .5)
                        * -5;

                    const rotateY =
                        ((x / rect.width) - .5)
                        * 5;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-9px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       CHART ANIMATION
    ===================================================== */

    const chart =
        document.querySelector(
            ".dashboard-chart"
        );

    if (chart) {

        const chartObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        chartColumns.forEach(
                            (column, index) => {

                                setTimeout(() => {

                                    column.classList.add(
                                        "active"
                                    );

                                }, index * 90);

                            }
                        );

                        observer.unobserve(
                            chart
                        );

                    });

                },
                {
                    threshold: .25
                }
            );


        chartObserver.observe(
            chart
        );

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".button, .cta-button, .header-cta"
        );

    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement(
                        "span"
                    );

                const rect =
                    button.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

                ripple.style.position =
                    "absolute";

                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(255,255,255,.22)";

                ripple.style.pointerEvents =
                    "none";

                ripple.style.transform =
                    "scale(0)";

                ripple.style.animation =
                    "mobexRipple .65s ease-out forwards";

                if (
                    getComputedStyle(button)
                        .position ===
                    "static"
                ) {

                    button.style.position =
                        "relative";

                }

                button.style.overflow =
                    "hidden";

                button.appendChild(
                    ripple
                );

                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });


    /* =====================================================
       RIPPLE CSS
    ===================================================== */

    const rippleStyle =
        document.createElement(
            "style"
        );

    rippleStyle.textContent = `
        @keyframes mobexRipple {
            0% {
                transform: scale(0);
                opacity: .8;
            }

            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;

    document.head.appendChild(
        rippleStyle
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mobileMenu?.classList.contains(
                    "active"
                )
            ) {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "no-scroll"
                );

                const bars =
                    menuToggle?.querySelectorAll(
                        "span"
                    );

                bars?.forEach((bar) => {

                    bar.style.transform = "";
                    bar.style.opacity = "";

                });

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document
            .querySelectorAll(".reveal")
            .forEach((element) => {

                element.classList.add(
                    "visible"
                );

            });

    }

});