import { defaultName } from "../models/variables.js"
import { elementNullCheck } from "../utils/domHelpers.js"
import { validateUsername, validatePassword } from "../utils/validation.js"
import { storeUser } from "../utils/storage.js"

const loginButton = elementNullCheck<HTMLButtonElement>("#btn-login");

loginButton.addEventListener("click", () => {
  const usernameInput = elementNullCheck<HTMLInputElement>("#username");
  const username = usernameInput.value;

  const passwordInput = elementNullCheck<HTMLInputElement>("#password");
  const password = passwordInput.value;

  const remeberInput = elementNullCheck<HTMLInputElement>("#remember");
  const remember = remeberInput.checked;


  if (!validatePassword(password) || !validateUsername(username)) {
    alert("Invalid username or password.");
    return;
  }
  storeUser(username, password, remember);
  window.location.replace("dashboard.html");
});
