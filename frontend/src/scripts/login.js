document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("✅ Login realizado com sucesso!");
          console.log("Token JWT:", data.token);

          // Salva o token no navegador (para acessar rotas protegidas depois)
          localStorage.setItem("token", data.token);

          alert("Login realizado com sucesso!");
          // Redireciona pra página principal, se quiser
          // window.location.href = "dashboard.html";
        } else {
          alert(data.erro || "Erro ao fazer login.");
        }
      } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
        alert("Erro de conexão com o servidor.");
      }
    });
  }
});
