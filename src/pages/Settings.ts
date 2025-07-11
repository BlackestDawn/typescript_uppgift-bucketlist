// här är det bara level-up!
import { defaultName, defaultThemes as themes } from "../models/variables.js";
import { getUser, changeUsername, logoutUser } from "../utils/storage.js";
import { elementNullCheck } from "../utils/domHelpers.js";
import { moveDreams, getThemes, storeThemes, moveThemes, removeThemeByIndex } from "../utils/storage.js";

window.addEventListener('DOMContentLoaded', () => {
  const nameInput = elementNullCheck<HTMLInputElement>("#name-input");
  nameInput.value = getUser() || defaultName;

  const changeUsernameButton = elementNullCheck<HTMLButtonElement>("#change-username");
  changeUsernameButton.addEventListener("click", handlerChangeUsername);

  const addThemeButton = elementNullCheck<HTMLButtonElement>("#add-theme");
  addThemeButton.addEventListener("click", handlerAddTheme);

  const themeList = elementNullCheck<HTMLUListElement>("#theme-list");
  themeList.addEventListener("click", handlerDeleteTheme);

  renderThemeList();
});

function renderThemeList() {
  const themeList = elementNullCheck<HTMLUListElement>("#theme-list");
  const themes = getThemes();
  if (!themeList) return;

  themeList.replaceChildren(...themes.map((theme, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<p>${theme}</p> <img src="../assets/images/trash_delete.png" id="theme-${index}" />`;
    return li;
  }));
}

// "logga ut"
const logOutBtn = elementNullCheck<HTMLButtonElement>(".logout");
logOutBtn?.addEventListener("click", logOut);

function logOut(): void {
  logoutUser();
  window.location.replace('login.html');
};

function handlerChangeUsername(): void {
  const oldUsername = getUser();
  if (!oldUsername) return;
  const newUsername = elementNullCheck<HTMLInputElement>("#name-input").value;
  if (newUsername === oldUsername) return;
  moveDreams(oldUsername, newUsername);
  moveThemes(oldUsername, newUsername);
  changeUsername(newUsername);
}

function handlerAddTheme(): void {
  const newTheme = elementNullCheck<HTMLInputElement>("#theme-input").value;
  if (!newTheme) return;
  const themes = getThemes();
  themes.push(newTheme);
  storeThemes(themes);
  renderThemeList();
}

function handlerDeleteTheme(event: Event): void {
  const target = event.target as HTMLElement;
  const button = target.closest("img");
  if (!button) return;
  const index = parseInt(button.id.split("-")[1]);
  if (isNaN(index)) return;
  removeThemeByIndex(index);
  renderThemeList();
}
