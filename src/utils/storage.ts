import { Dreams, Themes } from "../models/types.js";
import { defaultThemes } from "../models/variables.js";

export function storeUser(username: string, password: string, remember?: boolean) {
  if (remember) {
    localStorage.setItem("bucket-list-username", username);
    localStorage.setItem("bucket-list-password", password);
    return;
  }
  sessionStorage.setItem("bucket-list-username", username);
  sessionStorage.setItem("bucket-list-password", password);
}

export function getUser(): string | null {
  if (localStorage.getItem("bucket-list-username")) {
    return localStorage.getItem("bucket-list-username");
  }
  return sessionStorage.getItem("bucket-list-username");
}

export function getPassword(): string | null {
  if (localStorage.getItem("bucket-list-password")) {
    return localStorage.getItem("bucket-list-password");
  }
  return sessionStorage.getItem("bucket-list-password");
}

export function logoutUser() {
  const user = getUser();
  if (!user) return;
  localStorage.removeItem("bucket-list-username");
  localStorage.removeItem("bucket-list-password");
  sessionStorage.removeItem("bucket-list-username");
  sessionStorage.removeItem("bucket-list-password");
}

export function removeUser() {
  logoutUser();
  removeDreams();
  removeThemes();
}

export function changeUsername(newUsername: string) {
  if (localStorage.getItem("bucket-list-username")) {
    localStorage.setItem("bucket-list-username", newUsername);
  } else {
    sessionStorage.setItem("bucket-list-username", newUsername);
  }
}

export function storeDreams(dreams: Dreams) {
  const user = getUser();
  if (!user) return;
  localStorage.setItem(`bucket-list-dreams-${user}`, JSON.stringify(dreams));
}

export function getDreams(): Dreams {
  const user = getUser();
  if (!user) return [];
  const dreams = localStorage.getItem(`bucket-list-dreams-${user}`);
  if (dreams) {
    return JSON.parse(dreams);
  }
  return [];
}

export function moveDreams(oldUser: string, newUser: string) {
  const oldDreams = localStorage.getItem(`bucket-list-dreams-${oldUser}`);
  if (!oldDreams) return;
  localStorage.setItem(`bucket-list-dreams-${newUser}`, oldDreams);
  localStorage.removeItem(`bucket-list-dreams-${oldUser}`);
}

export function removeDreams() {
  const user = getUser();
  if (!user) return;
  localStorage.removeItem(`bucket-list-dreams-${user}`);
}

export function storeThemes(themes: Themes) {
  const user = getUser();
  if (!user) return;
  localStorage.setItem(`bucket-list-themes-${user}`, JSON.stringify(themes));
}

export function getThemes(): Themes {
  const user = getUser();
  if (!user) return defaultThemes;
  const themes = localStorage.getItem(`bucket-list-themes-${user}`);
  if (themes) {
    return JSON.parse(themes);
  }
  return defaultThemes;
}

export function moveThemes(oldUser: string, newUser: string) {
  const oldThemes = localStorage.getItem(`bucket-list-themes-${oldUser}`);
  if (!oldThemes) return;
  localStorage.setItem(`bucket-list-themes-${newUser}`, oldThemes);
  localStorage.removeItem(`bucket-list-themes-${oldUser}`);
}

export function removeThemes() {
  const user = getUser();
  if (!user) return;
  localStorage.removeItem(`bucket-list-themes-${user}`);
}

export function removeThemeByIndex(index: number) {
  const themes = getThemes();
  const dreams = getDreams();
  const removedTheme = themes[index];
  dreams.forEach(dream => {
    if (dream.theme === removedTheme) {
      dream.theme = "-";
    }
  });
  themes.splice(index, 1);
  storeThemes(themes);
}
