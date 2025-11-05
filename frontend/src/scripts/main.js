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

  // modal de login
  const modal = document.getElementById("login-modal");
  const btnEntrar = document.querySelector(".btn-entrar");
  const closeBtn = document.querySelector(".close-modal");

  if (btnEntrar && modal && closeBtn) {
    // abre o modal
    btnEntrar.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    // fecha no "x"
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
      }
  });

// Personalização para o menu mobile 

