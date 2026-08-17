/* =========================================================
   MINI TLC - TERMOS E PRIVACIDADE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelectorAll(".legal-navigation a");

  const sections = document.querySelectorAll(".legal-card");

  /*
   * Destaca a seção atualmente visível
   * na navegação.
   */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navigation.forEach((link) => {
            link.classList.remove("active");
          });

          const id = entry.target.id;

          const activeLink = document.querySelector(
            `.legal-navigation a[href="#${id}"]`,
          );

          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  /*
   * Rolagem suave.
   */

  navigation.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
