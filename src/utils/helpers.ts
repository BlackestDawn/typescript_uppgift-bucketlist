import { User } from "../models/types.js";
import { load } from "./storage.js";
import { ItemWithId, StorageTypes } from "../models/types.js";

export function getCurrentUserId() {
  let data;
  if (sessionStorage.getItem("currentUser")) {
    data = sessionStorage.getItem("currentUser");
  } else {
    data = localStorage.getItem("currentUser");
  }
  return parseInt(data || '');
}

export function setCurrentUser(user: User, remember: boolean) {
  if (remember) {
    localStorage.setItem("currentUser", user.id.toString());
  } else {
    sessionStorage.setItem("currentUser", user.id.toString());
  }
}

export function logoutUser() {
  sessionStorage.removeItem("currentUser");
  localStorage.removeItem("currentUser");
}

export function getUserByUsername(username: string) {
  const data = localStorage.getItem("users");

  if (!data) return null;
  const users: User[] = JSON.parse(data);

  if (!users) return null;
  return users.find(user => user.username === username) || null;
}

export function getNewId<T extends ItemWithId>(key: StorageTypes): number {
  const data = load<T>(key) as T[];
  if (!data) return 0;
  return data.reduce((max, item) => Math.max(max, item.id), 0);
}

export function checkLoggedInUser() {
  const currentUser = getCurrentUserId();
  const pageName: string = window.location.pathname.split('/').pop() || '';
  if (pageName === 'login.html' || pageName === 'index.html' || pageName === '') {
    if (currentUser) {
      window.location.href = "dashboard.html";
    }
    return;
  }

  if (!currentUser && pageName !== 'login.html') {
    window.location.href = "login.html";
  }
}

export function setDisplayName(element: HTMLElement) {
  const user = load<User>("users", getCurrentUserId()) as User;
  element.textContent = user.username;
}
