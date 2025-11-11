document.addEventListener("DOMContentLoaded", () => {
  const link = document.querySelector(".link");
  const dropdown = document.querySelector(".dropdown-vagas");
  const navLink = link.querySelector(".nav-link");

  let hoverTimeout;

  function showDropdown() {
    clearTimeout(hoverTimeout);
    dropdown.style.display = "block";
    navLink.classList.add("active");
  }

  function hideDropdown() {
    hoverTimeout = setTimeout(() => {
      dropdown.style.display = "none";
      navLink.classList.remove("active");
    }, 150);
  }

  link.addEventListener("mouseenter", showDropdown);
  link.addEventListener("mouseleave", hideDropdown);
  dropdown.addEventListener("mouseenter", showDropdown);
  dropdown.addEventListener("mouseleave", hideDropdown);

  const modal = document.getElementById("login-modal");
  const closeBtn = document.querySelector(".close-modal");
  const abrirModalElems = document.querySelectorAll(".abrir-modal");

  if (modal && closeBtn) {
    abrirModalElems.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        e.preventDefault(); // evita que o link navegue
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
});
