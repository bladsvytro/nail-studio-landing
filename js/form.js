/* form.js — онлайн-запись: валидация + отправка в Telegram + альтернатива mailto.
 *
 * Способ 1 (рекомендуется): Telegram-бот — мгновенно в чат студии.
 *   Включите TELEGRAM.enabled = true, впишите token и chatId (см. README).
 * Способ 2 (без бэкенда и без бота): mailto — открывает почтовый клиент
 *   с заполненным письмом. Работает всегда, fallback по умолчанию.
 */
"use strict";

const TELEGRAM = {
  enabled: false,                 // ← true, чтобы слать в Telegram
  token: "YOUR_BOT_TOKEN",
  chatId: "YOUR_CHAT_ID",
};
const SALON_EMAIL = "studio@example.ru";   // ← для способа mailto

const form = document.getElementById("booking-form");
const modal = document.getElementById("thanks-modal");
const modalClose = document.getElementById("thanks-close");

function showError(field, show) {
  const wrap = field.closest(".field");
  const err = wrap?.querySelector(".field__err");
  if (wrap) wrap.toggleAttribute("data-invalid", show);
  if (err) err.hidden = !show;
  field.toggleAttribute("aria-invalid", show);
}
const validPhone = (v) => { const d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 15; };
function openModal() { if (typeof modal?.showModal === "function") modal.showModal(); else alert("Заявка принята!"); }
modalClose?.addEventListener("click", () => modal.close());
modal?.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

function summary(d) {
  return `Мастер: ${d.master}\nУслуга: ${d.service}\nДата: ${d.date} ${d.time}\nИмя: ${d.name}\nТелефон: ${d.phone}`;
}
async function sendTelegram(d) {
  const text = `💅 Новая запись (Лакрица)\n${summary(d)}`;
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM.token}/sendMessage`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM.chatId, text }),
  });
  if (!res.ok) throw new Error("tg");
}
function sendMailto(d) {
  const subject = encodeURIComponent("Онлайн-запись — Лакрица");
  const body = encodeURIComponent(summary(d));
  window.location.href = `mailto:${SALON_EMAIL}?subject=${subject}&body=${body}`;
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.elements.name, phone = form.elements.phone;
  let ok = true;
  if (!name.value.trim()) { showError(name, true); ok = false; } else showError(name, false);
  if (!validPhone(phone.value)) { showError(phone, true); ok = false; } else showError(phone, false);
  if (form.elements._honey?.value) { openModal(); return; }
  if (!ok) { (name.value ? phone : name).focus(); return; }

  const d = Object.fromEntries(new FormData(form).entries());
  const btn = form.querySelector("button[type=submit]");
  const original = btn.innerHTML; btn.disabled = true; btn.textContent = "Отправляем…";
  try {
    if (TELEGRAM.enabled) await sendTelegram(d);
    else sendMailto(d);                 // fallback без бэкенда
    form.reset();
    openModal();
  } catch {
    sendMailto(d);                      // если Telegram недоступен — почта
  } finally { btn.disabled = false; btn.innerHTML = original; }
});
