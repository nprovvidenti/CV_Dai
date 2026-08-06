const skills = [
  { label: "Ensino de Física", value: 5 },
  { label: "Ensino de Matemática", value: 5 },
  { label: "Projetos Educativos", value: 5 },
  { label: "Gestão e Execução", value: 4 },
  { label: "Comunicação", value: 5 },
  { label: "Liderança", value: 4 },
  { label: "Trabalho em equipe", value: 5 },
  { label: "Pacote Office", value: 4 },
];

const accent = "#d43d52";
const muted = "rgba(255, 255, 255, 0.6)";

function initSkillsChart() {
  const canvas = document.getElementById("skillsChart");
  const legend = document.getElementById("skillsLegend");
  if (!canvas || typeof Chart === "undefined") return;

  legend.innerHTML = skills
    .map(
      (skill) => `
      <li>
        <span class="dot" aria-hidden="true"></span>
        <span>${skill.label}</span>
        <span class="value">${skill.value}/5</span>
      </li>`
    )
    .join("");

  new Chart(canvas, {
    type: "radar",
    data: {
      labels: skills.map((s) => s.label),
      datasets: [
        {
          data: skills.map((s) => s.value),
          backgroundColor: "rgba(212, 61, 82, 0.22)",
          borderColor: accent,
          borderWidth: 2,
          pointBackgroundColor: accent,
          pointBorderColor: "#fff",
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.raw}/5`,
          },
        },
      },
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            display: false,
          },
          grid: { color: "rgba(255, 255, 255, 0.08)" },
          angleLines: { color: "rgba(255, 255, 255, 0.08)" },
          pointLabels: {
            color: muted,
            font: { size: 10, family: "Inter, system-ui, sans-serif" },
          },
        },
      },
    },
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

function initSectionNav() {
  const nav = document.querySelector(".section-nav");
  const toggle = document.querySelector(".section-nav__toggle");
  const links = [...document.querySelectorAll(".section-nav__list a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  if (!sections.length || !("IntersectionObserver" in window)) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => spy.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  initSectionNav();
  initSkillsChart();
});
