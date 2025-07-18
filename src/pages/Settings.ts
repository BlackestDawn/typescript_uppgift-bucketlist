// här är det bara level-up!
import { defaultThemes } from "../models/variables.js";
import { Storage } from "../utils/storage.js";
import { getHTMLElement } from "../utils/domHelpers.js";
import { checkLoggedInUser, getCurrentUserId, logoutUser } from "../utils/helpers.js";
import { Theme, User } from "../models/types.js";

const {save: saveThemes, load: loadThemes, remove: removeThemes, getNewId: getNewIdThemes} = Storage<Theme>("themes");
const {save: saveUsers, load: loadUsers} = Storage<User>("users");



window.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();

  const changeUsernameButton = getHTMLElement<HTMLButtonElement>("#change-username");
  changeUsernameButton.addEventListener("click", handlerChangeUsername);

  const addThemeButton = getHTMLElement<HTMLButtonElement>("#add-theme");
  addThemeButton.addEventListener("click", handlerAddTheme);

  const themeList = getHTMLElement<HTMLUListElement>("#theme-list");
  themeList.addEventListener("click", handlerDeleteTheme);

  renderThemeList();
});

function renderThemeList() {
  const themeList = getHTMLElement<HTMLUListElement>("#theme-list");
  const themes = loadThemes() as Theme[] || defaultThemes;

  themeList.replaceChildren(...themes.map((theme) => {
    const li = document.createElement("li");
    li.innerHTML = `<p>${theme.name}</p> <img src="../assets/images/trash_delete.png" id="theme-${theme.id}" />`;
    return li;
  }));
}

// "logga ut"
const logOutBtn = getHTMLElement<HTMLButtonElement>(".logout");
logOutBtn?.addEventListener("click", logOut);

function logOut(): void {
  logoutUser();
  window.location.href = 'login.html';
};

function handlerChangeUsername(): void {
  const user = loadUsers(getCurrentUserId()) as User;
  const newUsername = getHTMLElement<HTMLInputElement>("#name-input").value;
  if (newUsername === user.username) return;
  user.username = newUsername;
  saveUsers(user);
  window.location.reload();
}

function handlerAddTheme(): void {
  const newThemeName = getHTMLElement<HTMLInputElement>("#theme-input").value;
  if (!newThemeName) return;
  saveThemes({
    id: getNewIdThemes(),
    name: newThemeName
  });
  renderThemeList();
}

function handlerDeleteTheme(event: Event): void {
  const target = event.target as HTMLElement;
  const button = target.closest("img");
  if (!button) return;
  const index = parseInt(button.id.split("-")[1]);
  if (isNaN(index)) return;
  removeThemes(index);
  renderThemeList();
}
