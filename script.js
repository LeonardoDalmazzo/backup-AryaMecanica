const menu = document.querySelector("[data-mobile-menu]");
const openButton = document.querySelector("[data-menu-open]");
const closeButton = document.querySelector("[data-menu-close]");
const menuLinks = document.querySelectorAll(".mobile-menu a");

const setMenuState = (isOpen) => {
  if (!menu || !openButton) return;

  if (isOpen) {
    menu.hidden = false;
    window.requestAnimationFrame(() => {
      menu.classList.add("is-open");
      document.body.classList.add("is-menu-open");
      openButton.setAttribute("aria-expanded", "true");
      closeButton?.focus();
    });
    return;
  }

  menu.classList.remove("is-open");
  document.body.classList.remove("is-menu-open");
  openButton.setAttribute("aria-expanded", "false");
  window.setTimeout(() => {
    menu.hidden = true;
  }, 240);
};

openButton?.addEventListener("click", () => setMenuState(true));
closeButton?.addEventListener("click", () => setMenuState(false));

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu && !menu.hidden) {
    setMenuState(false);
    openButton?.focus();
  }
});
