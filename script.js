const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-links a");
const progressBar = document.querySelector(".progress-bar");
const body = document.body;

function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function updateBodyPhase() {
  const scrollTop = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = total > 0 ? scrollTop / total : 0;

  body.classList.remove("phase-sketch", "phase-wireframe", "phase-final");

  if (ratio < 0.28) {
    body.classList.add("phase-sketch");
  } else if (ratio < 0.62) {
    body.classList.add("phase-wireframe");
  } else {
    body.classList.add("phase-final");
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, {
  threshold: 0.3
});

sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  updateProgressBar();
  updateBodyPhase();
});

window.addEventListener("load", () => {
  updateProgressBar();
  updateBodyPhase();
});

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}