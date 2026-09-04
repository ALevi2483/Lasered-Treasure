/* =========================================================
   LASERED TREASURE
   Main JavaScript
   File: assets/js/main.js
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileNavigation = document.getElementById("mobileNavigation");

    if (mobileMenuButton && mobileNavigation) {

        mobileMenuButton.addEventListener("click", function () {

            const isOpen = mobileNavigation.classList.toggle("open");

            mobileMenuButton.classList.toggle("active", isOpen);

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        /* Close mobile menu when a navigation link is clicked */

        const mobileLinks = mobileNavigation.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mobileNavigation.classList.remove("open");
                mobileMenuButton.classList.remove("active");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu if screen is resized back to desktop */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 940) {

                mobileNavigation.classList.remove("open");
                mobileMenuButton.classList.remove("active");

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }



    /* =====================================================
       2. CURRENT YEAR IN FOOTER
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent = new Date().getFullYear();

    }



    /* =====================================================
       3. FAQ ACCORDION
       Used later on faq.html
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) {
            return;
        }

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("open");


            /* Close all FAQ items first */

            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("open");

                const otherButton =
                    otherItem.querySelector(".faq-question");

                if (otherButton) {

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            });


            /* Open clicked item if it was previously closed */

            if (!isOpen) {

                item.classList.add("open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });



    /* =====================================================
       4. GALLERY FILTERS
       Used later on gallery.html
    ===================================================== */

    const galleryButtons =
        document.querySelectorAll(".gallery-filter-button");

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    if (galleryButtons.length && galleryItems.length) {

        galleryButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const filter =
                    button.getAttribute("data-filter");


                /* Update active button */

                galleryButtons.forEach(function (otherButton) {

                    otherButton.classList.remove("active");

                });

                button.classList.add("active");


                /* Filter gallery */

                galleryItems.forEach(function (item) {

                    const category =
                        item.getAttribute("data-category");

                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        item.classList.remove("hidden");

                    } else {

                        item.classList.add("hidden");

                    }

                });

            });

        });


        /* =================================================
           Read category from URL

           Example:
           gallery.html?category=military
        ================================================= */

        const urlParameters =
            new URLSearchParams(window.location.search);

        const requestedCategory =
            urlParameters.get("category");


        if (requestedCategory) {

            const matchingButton =
                document.querySelector(
                    '.gallery-filter-button[data-filter="' +
                    requestedCategory +
                    '"]'
                );

            if (matchingButton) {

                matchingButton.click();

            }

        }

    }



    /* =====================================================
       5. GALLERY LIGHTBOX
       Used later on gallery.html
    ===================================================== */

    const lightbox =
        document.getElementById("galleryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxClose =
        document.getElementById("lightboxClose");


    if (lightbox && lightboxImage) {

        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const image =
                    item.querySelector("img");

                const title =
                    item.getAttribute("data-title");

                if (!image) {
                    return;
                }


                lightboxImage.src = image.src;

                lightboxImage.alt =
                    image.alt || "Gallery image";


                if (lightboxTitle) {

                    lightboxTitle.textContent =
                        title || image.alt || "";

                }


                lightbox.classList.add("open");

                document.body.classList.add(
                    "lightbox-open"
                );

            });

        });


        function closeLightbox() {

            lightbox.classList.remove("open");

            document.body.classList.remove(
                "lightbox-open"
            );

        }


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeLightbox
            );

        }


        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("open")
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =====================================================
       6. SMOOTH SCROLL FOR HASH LINKS
    ===================================================== */

    const hashLinks =
        document.querySelectorAll('a[href^="#"]');


    hashLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const destination =
                    link.getAttribute("href");


                if (!destination || destination === "#") {
                    return;
                }


                const target =
                    document.querySelector(destination);


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });



    /* =====================================================
       7. HEADER SCROLL CLASS
    ===================================================== */

    const siteHeader =
        document.querySelector(".site-header");


    function updateHeaderOnScroll() {

        if (!siteHeader) {
            return;
        }


        if (window.scrollY > 30) {

            siteHeader.classList.add(
                "scrolled"
            );

        } else {

            siteHeader.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeaderOnScroll();

    window.addEventListener(
        "scroll",
        updateHeaderOnScroll
    );

});
