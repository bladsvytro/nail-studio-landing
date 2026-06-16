/* main.js — навигация, год, reveal, генерация галереи «до/после». */
"use strict";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) { menu.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); } });
}

/* Галерея работ: 6 фото. Лёгкий zoom при наведении (см. CSS). */
const gallery = document.querySelector(".works-gallery");
if (gallery) {
  gallery.innerHTML = [1, 2, 3, 4, 5, 6].map((n) => `
    <li class="works-gallery__item">
      <img src="assets/img/work-${n}.jpg" alt="Пример работы студии «Лакрица» №${n}" width="600" height="600" loading="lazy" decoding="async" />
    </li>`).join("");
}

/* Reveal on scroll */
const reveals = document.querySelectorAll("[data-reveal]");
if (reveals.length && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries, obs) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
  }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
  reveals.forEach((el) => io.observe(el));
} else { reveals.forEach((el) => el.classList.add("is-visible")); }

/* Минимальная дата записи — сегодня */
const dateInput = document.getElementById("date");
if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
