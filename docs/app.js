const toc = document.querySelector(".toc");
const toggle = document.querySelector(".menu-toggle");
const links = Array.from(document.querySelectorAll(".toc a"));
const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (toggle && toc) {
  toggle.addEventListener("click", () => {
    const open = toc.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    }
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0.05,
  }
);

sections.forEach((section) => observer.observe(section));
