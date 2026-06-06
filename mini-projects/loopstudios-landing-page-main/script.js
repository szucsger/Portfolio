// Responsive image handling and mobile menu toggle for Loopstudios landing page

const mobileBreakpoint = window.matchMedia("(max-width: 768px)");

function updateResponsiveAssets() {
  const isMobile = mobileBreakpoint.matches;

  document.querySelectorAll("img[data-mobile]").forEach((image) => {
    if (!image.dataset.desktop) {
      image.dataset.desktop = image.getAttribute("src");
    }

    image.src = isMobile ? image.dataset.mobile : image.dataset.desktop;
  });

  const header = document.querySelector(".header");

  if (header) {
    const desktopBackground = header.dataset.desktopBg;
    const mobileBackground = header.dataset.mobileBg;

    if (desktopBackground && mobileBackground) {
      header.style.backgroundImage = `url('${isMobile ? mobileBackground : desktopBackground}')`;
    }
  }
}

updateResponsiveAssets();
mobileBreakpoint.addEventListener("change", updateResponsiveAssets);

// Mobile menu toggle functionality
const hamburgerButton = document.querySelector(".hamburger-button");
const header = document.querySelector(".header");
const closeButton = document.querySelector(".hamburger-close-button");
const menuLinks = document.querySelectorAll(".hamburger-menu a");

function openMenu() {
  if (!header || !hamburgerButton) return;
  header.classList.add("menu-open");
  hamburgerButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  if (!header || !hamburgerButton) return;
  header.classList.remove("menu-open");
  hamburgerButton.setAttribute("aria-expanded", "false");
}

if (hamburgerButton && header) {
  hamburgerButton.setAttribute("aria-expanded", "false");

  hamburgerButton.addEventListener("click", () => {
    if (header.classList.contains("menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (closeButton && header) {
  closeButton.addEventListener("click", closeMenu);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});
