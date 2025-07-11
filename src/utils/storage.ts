import { Dreams, Themes } from "../models/types.js";
import { defaultThemes } from "../models/variables.js";
import { testDreams } from "../models/variables.js";

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

export function removeUser() {
  localStorage.removeItem("bucket-list-username");
  localStorage.removeItem("bucket-list-password");
  sessionStorage.removeItem("bucket-list-username");
  sessionStorage.removeItem("bucket-list-password");
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
  return testDreams;
}

export function storeThemes(themes: Themes) {
  localStorage.setItem("bucket-list-themes", JSON.stringify(themes));
}

export function getThemes(): Themes {
  const themes = localStorage.getItem("bucket-list-themes");
  if (themes) {
    return JSON.parse(themes);
  }
  return defaultThemes;
}
