// här är det bara level-up!
import { defaultThemes } from "../models/variables.js";
import { save, load, remove } from "../utils/storage.js";
import { getHTMLElement } from "../utils/domHelpers.js";
import { checkLoggedInUser, setDisplayName, getNewId, getCurrentUserId, logoutUser } from "../utils/helpers.js";
import { Theme, User } from "../models/types.js";

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
  const themes = load<Theme>("themes") as Theme[] || defaultThemes;

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
  window.location.replace('login.html');
};

function handlerChangeUsername(): void {
  const oldUser = load<User>("users", getCurrentUserId()) as User;
  const newUsername = getHTMLElement<HTMLInputElement>("#name-input").value;
  if (newUsername === oldUser.username) return;
  oldUser.username = newUsername;
  save('users', oldUser);
  window.location.reload();
}

function handlerAddTheme(): void {
  const newThemeName = getHTMLElement<HTMLInputElement>("#theme-input").value;
  if (!newThemeName) return;
  const themes = load<Theme>("themes") as Theme[];
  const highestId = getNewId<Theme>("themes");
  const newTheme: Theme = {
    id: highestId + 1,
    name: newThemeName
  };
  save('themes', newTheme);
  renderThemeList();
}

function handlerDeleteTheme(event: Event): void {
  const target = event.target as HTMLElement;
  const button = target.closest("img");
  if (!button) return;
  const index = parseInt(button.id.split("-")[1]);
  if (isNaN(index)) return;
  remove('themes', index);
  renderThemeList();
}
