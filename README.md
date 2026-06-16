# 💅 Студия маникюра «Лакрица» — лендинг с онлайн-записью

Современный лендинг для студии маникюра: пастельный дизайн, плавные
микроинтеракции, **галерея работ**, прайс, карточки мастеров, отзывы
и **форма онлайн-записи** (выбор мастера, услуги, даты и времени) с отправкой
в **Telegram-бот** или на **email (mailto)** — без бэкенда.

> Стек: **HTML5 + CSS3 (Custom Properties, Grid/Flex) + vanilla JS** · Google Fonts (Comfortaa/Nunito) · Font Awesome 6.

![Превью](assets/img/og-cover.png)

## ✨ Возможности
- 📱 Адаптив mobile-first, бургер-меню, доступность (skip-link, ARIA, focus-visible).
- 🎞 Галерея работ: 6 реальных фото, плавный zoom при наведении.
- 🎨 Микроинтеракции: подъём кнопок, hover-эффекты карточек, reveal по скроллу (IntersectionObserver).
- 📅 Форма записи: радио-выбор мастера, `input[type=date]` (min = сегодня), select времени, валидация.
- ✉️ Отправка без сервера: Telegram-бот **или** mailto. Модалка «Спасибо».
- 🔍 SEO: OG, JSON-LD `NailSalon`, sitemap, robots, manifest.

## 📨 Приём записей без бэкенда

### Способ 1 — Telegram-бот (рекомендуется)
1. [@BotFather](https://t.me/BotFather) → `/newbot` → скопируйте **токен** (`123456:ABC...`).
2. Узнайте **chat_id** через [@userinfobot](https://t.me/userinfobot).
3. В `js/form.js`:
   ```js
   const TELEGRAM = { enabled: true, token: "123456:ABC...", chatId: "123456789" };
   ```
   Заявка отправляется на `https://api.telegram.org/bot<token>/sendMessage` через `fetch`.
> ⚠️ Токен в публичном репо виден всем. Для продакшена вынесите отправку в прокси
> (Apps Script / Cloudflare Worker). Для демо/студии — допустимо.

### Способ 2 — mailto (совсем без настройки)
Оставьте `TELEGRAM.enabled = false` и впишите `SALON_EMAIL` в `js/form.js`.
Кнопка откроет почтовый клиент с заполненным письмом — работает всегда, без регистраций.

## 🚀 Деплой на GitHub Pages (кратко)

> Полная пошаговая версия — в README соседнего проекта `construction-landing`.

```powershell
cd "путь\к\nail-studio-landing"
git init
git add .
git commit -m "Initial commit: лендинг студии маникюра"
git branch -M main
git remote add origin https://github.com/bladsvytro/nail-studio-landing.git
git push -u origin main
```
Затем: **Settings → Pages → Source: GitHub Actions**. Сайт:
`https://bladsvytro.github.io/nail-studio-landing/` (через ~1–2 мин).

Своя доменная зона — см. README `construction-landing`, шаг 6 (A-записи GitHub Pages).

## 🧪 Локальный запуск
```powershell
python -m http.server 5500   # http://localhost:5500
```

## 📝 Заменить под клиента
- Название, телефон, email, адрес, координаты.
- Фото в `assets/img/` (мастера, работы «до/после» — замените SVG на `.webp`).
- Прайс в `index.html`, мастеров и услуги в форме.
- Telegram-токен / email (см. выше).

## 📄 Лицензия
MIT — см. [LICENSE](LICENSE).
