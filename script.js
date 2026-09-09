const menu = document.querySelector("[data-mobile-menu]");
const openButton = document.querySelector("[data-menu-open]");
const closeButton = document.querySelector("[data-menu-close]");
const internalLinks = document.querySelectorAll('a[href^="#"]');
const desktopQuery = window.matchMedia("(min-width: 45rem)");
const galleryButtons = Array.from(document.querySelectorAll("[data-lightbox-open]"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const lazyVideo = document.querySelector("[data-lazy-video]");
const contactForm = document.querySelector("[data-contact-form]");
const contactFormStatus = document.querySelector("[data-form-status]");
const contactFormSubmit = document.querySelector("[data-form-submit]");

let closeTimer;
let activeLightboxIndex = 0;
let lastFocusedElement = null;

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const isMenuOpen = () => Boolean(menu?.classList.contains("is-open"));

const setMenuState = (isOpen) => {
  if (!menu || !openButton) return;

  if (isOpen) {
    window.clearTimeout(closeTimer);
    menu.hidden = false;
    menu.setAttribute("aria-hidden", "false");
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
  closeTimer = window.setTimeout(() => {
    menu.hidden = true;
    menu.setAttribute("aria-hidden", "true");
  }, 240);
};

menu?.setAttribute("aria-hidden", "true");

openButton?.addEventListener("click", () => {
  setMenuState(!isMenuOpen());
});

closeButton?.addEventListener("click", () => setMenuState(false));

internalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (isMenuOpen()) {
      setMenuState(false);
    }
  });
});

menu?.addEventListener("click", (event) => {
  if (event.target === menu) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (!menu || !isMenuOpen()) return;

  if (event.key === "Escape") {
    setMenuState(false);
    openButton?.focus();
    return;
  }

  if (event.key !== "Tab") return;

  const focusableItems = Array.from(menu.querySelectorAll(focusableSelector)).filter(
    (item) => !item.hasAttribute("disabled") && item.getAttribute("aria-hidden") !== "true",
  );

  if (focusableItems.length === 0) return;

  const firstItem = focusableItems[0];
  const lastItem = focusableItems[focusableItems.length - 1];

  if (event.shiftKey && document.activeElement === firstItem) {
    event.preventDefault();
    lastItem.focus();
  } else if (!event.shiftKey && document.activeElement === lastItem) {
    event.preventDefault();
    firstItem.focus();
  }
});

const loadVideo = () => {
  if (!lazyVideo || lazyVideo.dataset.loaded === "true") return;

  const source = lazyVideo.querySelector("source[data-src]");
  if (!source) return;

  source.src = source.dataset.src;
  source.removeAttribute("data-src");
  lazyVideo.dataset.loaded = "true";
  lazyVideo.load();
  lazyVideo.play().catch(() => {
    // A reproducao automatica pode ser bloqueada pelas preferencias do navegador.
  });
};

if (lazyVideo) {
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(
      (entries, observer) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        loadVideo();
        observer.disconnect();
      },
      { rootMargin: "400px 0px" },
    );

    videoObserver.observe(lazyVideo);
  } else {
    window.addEventListener(
      "load",
      () => {
        if (desktopQuery.matches) loadVideo();
      },
      { once: true },
    );
  }
}

const setContactFormStatus = (message, type = "") => {
  if (!contactFormStatus) return;

  contactFormStatus.textContent = message;
  contactFormStatus.classList.toggle("is-success", type === "success");
  contactFormStatus.classList.toggle("is-error", type === "error");
};

const contactResult = new URLSearchParams(window.location.search).get("contato");

if (contactResult === "sucesso") {
  setContactFormStatus("Mensagem enviada com sucesso. Entraremos em contato em breve.", "success");
} else if (contactResult === "erro") {
  setContactFormStatus("Nao foi possivel enviar agora. Tente novamente ou fale pelo WhatsApp.", "error");
}

if (contactResult && window.history.replaceState) {
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete("contato");
  window.history.replaceState({}, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
}

contactForm?.addEventListener("submit", async (event) => {
  if (!("fetch" in window)) return;

  event.preventDefault();
  setContactFormStatus("Enviando mensagem...");

  if (contactFormSubmit) {
    contactFormSubmit.disabled = true;
    contactFormSubmit.setAttribute("aria-busy", "true");
  }

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Nao foi possivel enviar a mensagem.");
    }

    contactForm.reset();
    setContactFormStatus(payload.message, "success");
  } catch (error) {
    setContactFormStatus(
      error instanceof Error ? error.message : "Nao foi possivel enviar agora. Tente novamente.",
      "error",
    );
  } finally {
    if (contactFormSubmit) {
      contactFormSubmit.disabled = false;
      contactFormSubmit.removeAttribute("aria-busy");
    }
  }
});

const closeMenuOnDesktop = (event) => {
  if (event.matches && isMenuOpen()) {
    setMenuState(false);
  }
};

if (typeof desktopQuery.addEventListener === "function") {
  desktopQuery.addEventListener("change", closeMenuOnDesktop);
} else {
  desktopQuery.addListener(closeMenuOnDesktop);
}

const galleryItems = galleryButtons
  .map((button) => {
    const image = button.querySelector("img");

    return {
      alt: image?.getAttribute("alt") ?? "",
      button,
      src: image?.getAttribute("src") ?? "",
    };
  })
  .filter((item) => item.src);

const updateLightboxImage = (index) => {
  if (!lightboxImage || galleryItems.length === 0) return;

  activeLightboxIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeLightboxIndex];

  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;

  if (lightboxCaption) {
    lightboxCaption.textContent = item.alt;
  }
};

const openLightbox = (index) => {
  if (!lightbox || !lightboxImage || galleryItems.length === 0) return;

  lastFocusedElement = document.activeElement;
  updateLightboxImage(index);
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-lightbox-open");
  window.requestAnimationFrame(() => {
    lightboxClose?.focus();
  });
};

const closeLightbox = () => {
  if (!lightbox || lightbox.hidden) return;

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-lightbox-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
};

const showLightboxOffset = (offset) => {
  updateLightboxImage(activeLightboxIndex + offset);
};

galleryItems.forEach((item, index) => {
  item.button.addEventListener("click", () => openLightbox(index));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => showLightboxOffset(-1));
lightboxNext?.addEventListener("click", () => showLightboxOffset(1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox || lightbox.hidden) return;

  if (event.key === "Escape") {
    closeLightbox();
    return;
  }

  if (event.key === "ArrowLeft") {
    showLightboxOffset(-1);
    return;
  }

  if (event.key === "ArrowRight") {
    showLightboxOffset(1);
    return;
  }

  if (event.key !== "Tab") return;

  const focusableItems = Array.from(lightbox.querySelectorAll(focusableSelector)).filter(
    (item) => !item.hasAttribute("disabled") && item.getAttribute("aria-hidden") !== "true",
  );

  if (focusableItems.length === 0) return;

  const firstItem = focusableItems[0];
  const lastItem = focusableItems[focusableItems.length - 1];

  if (event.shiftKey && document.activeElement === firstItem) {
    event.preventDefault();
    lastItem.focus();
  } else if (!event.shiftKey && document.activeElement === lastItem) {
    event.preventDefault();
    firstItem.focus();
  }
});
