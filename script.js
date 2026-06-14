const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.body.classList.add("motion-ready");

  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
  });

  const revealTargets = [
    ...document.querySelectorAll(
      ".section-heading, .category-grid article, .product-card, .feature-intro, .feature-grid article, .industries > div, .industry-grid span, .gallery figure, .quote-copy, .quote-form"
    ),
  ];

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");

    if (target.matches(".category-grid article, .feature-grid article, .industry-grid span, .gallery figure")) {
      const itemIndex = [...target.parentElement.children].indexOf(target);
      target.style.setProperty("--reveal-delay", `${Math.min(itemIndex * 70, 280)}ms`);
    } else {
      target.style.setProperty("--reveal-delay", `${Math.min(index * 24, 140)}ms`);
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  document.body.classList.add("is-loaded");
}
