// ========================================
// NOIR — LETTER INTERACTION
// ========================================

const openButton = document.getElementById("openLetter");
const letter = document.getElementById("letter");

if (openButton && letter) {
    openButton.addEventListener("click", () => {
        const isOpen = letter.classList.contains("show");

        if (isOpen) {
            letter.classList.remove("show");
            letter.setAttribute("aria-hidden", "true");

            openButton.querySelector("span:first-child").textContent =
                "Read my little note";

            openButton.querySelector(".button-arrow").textContent = "↗";
        } else {
            letter.classList.add("show");
            letter.setAttribute("aria-hidden", "false");

            openButton.querySelector("span:first-child").textContent =
                "Close my little note";

            openButton.querySelector(".button-arrow").textContent = "↙";
        }
    });
}

// ========================================
// NOIR — INTRO TRANSITION
// ========================================

const introScreen = document.getElementById("introScreen");
const enterButton = document.getElementById("enterButton");

if (introScreen && enterButton) {
    enterButton.addEventListener("click", () => {
        if (introScreen.classList.contains("leaving")) return;

        document.body.classList.add("entered");
        introScreen.classList.add("leaving");

        setTimeout(() => {
            introScreen.remove();
        }, 1900);
    });
}

// ========================================
// NOIR — CUSTOM CURSOR
// ========================================

const customCursor = document.getElementById("customCursor");

if (
    customCursor &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
    document.addEventListener("mousemove", (event) => {
        customCursor.style.left = `${event.clientX}px`;
        customCursor.style.top = `${event.clientY}px`;
        customCursor.classList.add("visible");
    });

    document.addEventListener("mouseleave", () => {
        customCursor.classList.remove("visible");
    });

    document.addEventListener("mouseover", (event) => {
        const target = event.target;

        if (
            target instanceof Element &&
            target.closest("a, button")
        ) {
            customCursor.classList.add("hovering");
        } else {
            customCursor.classList.remove("hovering");
        }
    });
}

// ========================================
// NOIR — PREMIUM PHOTO GALLERY
// ========================================

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

let previousFocus = null;

function openLightbox(item) {
    if (
        !lightbox ||
        !lightboxImage ||
        !lightboxCaption ||
        !lightboxClose
    ) return;

    previousFocus = item;

    const image = item.querySelector("img");

    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = image ? image.alt : "";
    lightboxCaption.textContent = item.dataset.title || "";

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    lightboxClose.focus();
}

function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (lightboxImage) {
        lightboxImage.src = "";
    }

    if (previousFocus) {
        previousFocus.focus();
    }
}

galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        openLightbox(item);
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

// ========================================
// NOIR — PREMIUM SCROLL REVEAL
// ========================================

(() => {
    const revealTargets = document.querySelectorAll(
        ".closing, .gallery-heading, .gallery-item"
    );

    if (!revealTargets.length) return;

    // Fallback: tampilkan konten jika browser tidak mendukung observer.
    if (!("IntersectionObserver" in window)) {
        revealTargets.forEach((element) => {
            element.classList.add("revealed");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealTargets.forEach((element, index) => {
        element.style.transitionDelay =
            `${Math.min(index % 4, 3) * 100}ms`;

        revealObserver.observe(element);
    });
})();
