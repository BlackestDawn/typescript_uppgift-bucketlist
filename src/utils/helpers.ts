import { User } from "../models/types.js";
import { Storage } from "./storage.js";

export function getCurrentUserId() {
  let data;
  if (sessionStorage.getItem("currentUser")) {
    data = sessionStorage.getItem("currentUser");
  } else {
    data = localStorage.getItem("currentUser");
  }
  return parseInt(data || '');
}

export function setCurrentUserId(user: User, remember: boolean) {
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
  const users = JSON.parse(data) as User[];
  if (!users) return null;
  return users.find(user => user.username === username) || null;
}

export function checkLoggedInUser() {
  const currentUser = getCurrentUserId();
  const pageName: string = window.location.pathname.split('/').pop() || '';
  if (currentUser) {
    if (pageName === 'login.html' || pageName === 'index.html' || pageName === '') window.location.href = "dashboard.html";
  } else {
    if (pageName !== 'login.html') window.location.href = "login.html";
  }
}

export function setDisplayName(element: HTMLElement) {
  const user = Storage<User>("users").load(getCurrentUserId()) as User;
  element.textContent = user.username;
}
