import { minPasswordLength } from "../models/variables.js";

export function validateUsername(username: string) {
  if (!username || username === "") {
    throw new Error("Username cannot be empty.");
  }
  return username;
}

export function validatePassword(password: string) {
  if (!password || password === "") {
    throw new Error("Password cannot be empty.");
  }
  if (password.length < minPasswordLength) {
    throw new Error(`Password must be at least ${minPasswordLength} characters long.`);
  }
  return password;
}
