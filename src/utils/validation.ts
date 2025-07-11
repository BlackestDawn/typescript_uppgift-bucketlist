import { minPasswordLength } from "../models/variables.js";

export function validateUsername(username: string): string {
  if (!username || username === "") {
    return "Username cannot be empty.";
  }
  return "";
}

export function validatePassword(password: string): string {
  if (!password || password === "") {
    return "Password cannot be empty.";
  }
  if (password.length < minPasswordLength) {
    return `Password must be at least ${minPasswordLength} characters long.`;
  }
  return "";
}
