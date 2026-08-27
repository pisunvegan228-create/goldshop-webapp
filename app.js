const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

const pageTitle = document.getElementById("page-title");
const menuScreen = document.getElementById("screen-menu");
const assortmentScreen = document.getElementById("screen-assortment");
const adminBtn = document.getElementById("admin-btn");
const wallpaperColor = "#c8c8c8";

function showMenu() {
  pageTitle.textContent = "Меню";
  menuScreen.classList.remove("hidden");
  assortmentScreen.classList.add("hidden");
}

function showAssortment() {
  pageTitle.textContent = "Ассортимент";
  menuScreen.classList.add("hidden");
  assortmentScreen.classList.remove("hidden");
}

function sendAction(action) {
  if (tg && tg.HapticFeedback) {
    tg.HapticFeedback.impactOccurred("light");
  }
  if (tg && tg.sendData) {
    tg.sendData(action);
    return;
  }
  window.location.hash = action;
}

function fitViewport() {
  const height = (tg && (tg.viewportStableHeight || tg.viewportHeight)) || window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${height}px`);
}

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor(wallpaperColor);
  tg.setBackgroundColor(wallpaperColor);
  if (tg.setBottomBarColor) {
    tg.setBottomBarColor(wallpaperColor);
  }
  if (tg.disableVerticalSwipes) {
    tg.disableVerticalSwipes();
  }
  tg.onEvent("viewportChanged", fitViewport);
  tg.onEvent("safeAreaChanged", fitViewport);
  tg.onEvent("contentSafeAreaChanged", fitViewport);
}

fitViewport();
window.addEventListener("resize", fitViewport);

const params = new URLSearchParams(window.location.search);
if (params.get("admin") === "1") {
  adminBtn.classList.remove("hidden");
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.getAttribute("data-action");
    if (action === "assortment") {
      showAssortment();
      return;
    }
    sendAction(action);
  });
});

document.getElementById("back-btn").addEventListener("click", showMenu);

showMenu();
