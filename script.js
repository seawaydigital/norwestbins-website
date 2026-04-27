const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const quoteForm = document.querySelector("#quoteForm");
const navLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = (sectionId) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  });
};

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    }
  });
}

if (navLinks.length && navSections.length) {
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveNav(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      }
    );

    navSections.forEach((section) => sectionObserver.observe(section));
  } else {
    const updateActiveNavFromScroll = () => {
      const currentSection = navSections.reduce((current, section) => {
        const sectionTop = section.getBoundingClientRect().top;
        return sectionTop <= window.innerHeight * 0.35 ? section : current;
      }, navSections[0]);

      setActiveNav(currentSection.id);
    };

    window.addEventListener("scroll", updateActiveNavFromScroll, { passive: true });
    updateActiveNavFromScroll();
  }
}

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const lines = [
      "Quote request from the Norwest Bins website",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Bin size: ${formData.get("bin-size") || "Not sure yet"}`,
      `Project type: ${formData.get("project-type") || ""}`,
      `Delivery location: ${formData.get("location") || ""}`,
      `Preferred date: ${formData.get("preferred-date") || ""}`,
      "",
      "Message:",
      `${formData.get("message") || ""}`,
    ];

    const subject = encodeURIComponent("Norwest Bins quote request");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:service@norwestbins.ca?subject=${subject}&body=${body}`;
  });
}
