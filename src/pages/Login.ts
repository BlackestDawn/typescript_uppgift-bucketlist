import { elementNullCheck } from "../utils/domHelpers.js"
import { validateUsername, validatePassword } from "../utils/validation.js"
import { storeUser } from "../utils/storage.js"
import { showExisting } from "../utils/notification.js";

const loginButton = elementNullCheck<HTMLButtonElement>("#login");
loginButton.addEventListener("click", () => {
  const usernameInput = elementNullCheck<HTMLInputElement>("#username");
  const username = usernameInput.value;

  const passwordInput = elementNullCheck<HTMLInputElement>("#password");
  const password = passwordInput.value;

  const remeberInput = elementNullCheck<HTMLInputElement>("#remember");
  const remember = remeberInput.checked;


  if (validatePassword(password) !== "") {
    const passwordError = elementNullCheck<HTMLDivElement>("#password-error-message");
    showExisting(passwordError);
    return;
  }
  if (validateUsername(username) !== "") {
    const usernameError = elementNullCheck<HTMLDivElement>("#username-error-message");
    showExisting(usernameError);
    return;
  }
  storeUser(username, password, remember);
  window.location.replace("dashboard.html");
});

const togglePasswordButton = elementNullCheck<HTMLButtonElement>("#toggle-password");
togglePasswordButton.addEventListener("click", () => {
  const passwordInput = elementNullCheck<HTMLInputElement>("#password");
  const currentType = passwordInput.type;
  if (currentType === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
