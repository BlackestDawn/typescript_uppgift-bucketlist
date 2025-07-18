import { getHTMLElement } from "../utils/domHelpers.js"
import { validateUser } from "../utils/validation.js"
import { save } from "../utils/storage.js"
import { setCurrentUserId, getUserByUsername, getNewId, checkLoggedInUser } from "../utils/helpers.js";
import { showExisting } from "../utils/notification.js";
import { User, InvalidUsernameError, InvalidPasswordError, InvalidCredentialsError } from "../models/types.js";
import { defaultThemes } from "../models/variables.js";

const loginButton = getHTMLElement<HTMLButtonElement>("#login");
loginButton.addEventListener("click", () => {
  const usernameInput = getHTMLElement<HTMLInputElement>("#username");
  const username = usernameInput.value;

  const passwordInput = getHTMLElement<HTMLInputElement>("#password");
  const password = passwordInput.value;

  const rememberInput = getHTMLElement<HTMLInputElement>("#remember");
  const remember = rememberInput.checked;

  const existingUser = getUserByUsername(username);
  const newId = getNewId<User>("users");

  const user: User = {
    id: existingUser ? existingUser.id : newId + 1,
    username,
    password
  };

  try {
    validateUser(user, existingUser);
    setCurrentUserId(user, remember);
    save('users', user);
    if (!existingUser) save('themes', defaultThemes);
    window.location.href = "dashboard.html";
  } catch (error) {
    if (error instanceof InvalidUsernameError) {
      const errorElement = getHTMLElement<HTMLDivElement>("#username-error-message");
      errorElement.textContent = (error as Error).message;
      showExisting(errorElement);
    }
    if (error instanceof InvalidPasswordError) {
      const errorElement = getHTMLElement<HTMLDivElement>("#password-error-message");
      errorElement.textContent = (error as Error).message;
      showExisting(errorElement);
    }
    if (error instanceof InvalidCredentialsError) {
      const errorElement = getHTMLElement<HTMLDivElement>("#login-error-message");
      errorElement.textContent = (error as Error).message;
      showExisting(errorElement);
    }
  }
});

const togglePasswordButton = getHTMLElement<HTMLButtonElement>("#toggle-password");
togglePasswordButton.addEventListener("click", () => {
  const passwordInput = getHTMLElement<HTMLInputElement>("#password");
  const currentType = passwordInput.type;
  if (currentType === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

window.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();
});
