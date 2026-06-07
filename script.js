const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  document.body.classList.add("motion-ready");

  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
  });

  const revealTargets = [
    ...document.querySelectorAll(
      ".intro, .capability-row span, .section-heading, .service-card, .split .panel, .process-copy, .proof-copy, .proof-list div, .cta > div, .cta form"
    ),
  ];

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");

    if (target.classList.contains("service-card")) {
      const cardIndex = [...document.querySelectorAll(".service-card")].indexOf(target);
      target.style.setProperty("--reveal-delay", `${Math.min(cardIndex * 70, 280)}ms`);
    } else if (target.parentElement?.classList.contains("capability-row")) {
      const itemIndex = [...target.parentElement.children].indexOf(target);
      target.style.setProperty("--reveal-delay", `${itemIndex * 70}ms`);
    } else if (target.parentElement?.classList.contains("proof-list")) {
      const itemIndex = [...target.parentElement.children].indexOf(target);
      target.style.setProperty("--reveal-delay", `${itemIndex * 70}ms`);
    } else {
      target.style.setProperty("--reveal-delay", `${Math.min(index * 25, 140)}ms`);
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
