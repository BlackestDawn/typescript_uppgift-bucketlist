export function storeUser(username: string, password: string) {
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("password", password);
}

export function getUser(): string | null {
  return sessionStorage.getItem("username");
}

export function getPassword(): string | null {
  return sessionStorage.getItem("password");
}

export function removeUser() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("password");
}

export function changeUsername(newUsername: string) {
  sessionStorage.setItem("username", newUsername);
}
