document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Active Section Highlighting (Intersection Observer)
  const links = Array.from(document.querySelectorAll(".toc a"));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

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
    { rootMargin: "-10% 0px -80% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));

  // Search Filter for Sidebar
  const searchInput = document.getElementById("nav-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      links.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.style.display = text.includes(term) ? "block" : "none";
      });
    });
  }

  // Copy Code Buttons
  document.querySelectorAll("pre").forEach((pre) => {
    // Wrap pre in a relative div
    const wrapper = document.createElement("div");
    wrapper.className = "code-wrapper";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create copy button
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    wrapper.appendChild(btn);

    // Copy event
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 2000);
      });
    });
  });

  // Simple Accordion for FAQ
  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const content = trigger.nextElementSibling;
      content.classList.toggle("open");
    });
  });
});