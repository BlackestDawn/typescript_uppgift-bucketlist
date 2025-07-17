import { minPasswordLength } from "../models/variables.js";
import { User } from "../models/types.js";
import { InvalidPasswordError, InvalidUsernameError, InvalidCredentialsError } from "../models/types.js";

export function validateUser(user: User, existing?: User | null) {
  if (!user.username) {
    throw new InvalidUsernameError("Användarnamn kan inte vara tomt.");
  }
  if (!user.password) {
    throw new InvalidPasswordError("Lösenord kan inte vara tomt.");
  }
  if (user.password.length < minPasswordLength) {
    throw new InvalidPasswordError(`Lösenord måste vara minst ${minPasswordLength} tecken långt.`);
  }
  if (existing && (existing.username !== user.username || existing.password !== user.password)) {
    throw new InvalidCredentialsError("Ogiltigt användarnamn eller lösenord.");
  }
}
