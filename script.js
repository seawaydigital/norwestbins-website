const navToggle = document.querySelector("#navToggle");
const primaryNav = document.querySelector("#primaryNav");
const quoteForm = document.querySelector("#quoteForm");

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
