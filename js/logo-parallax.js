document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  if (!logo) return;

  // Função de parallax temporário
  function handleParallax(e) {
    const x = (window.innerWidth / 2 - e.clientX) / 80;
    const y = (window.innerHeight / 2 - e.clientY) / 80;
    logo.style.transform = `translate(${x}px, ${y}px) scale(1)`;
  }

  // Ativa parallax
  document.addEventListener("mousemove", handleParallax);

  // Remove após 2s (tempo da animação)
  setTimeout(() => {
    document.removeEventListener("mousemove", handleParallax);
    logo.style.transform = "translate(0, 0) scale(1)";
  }, 2000);
});
