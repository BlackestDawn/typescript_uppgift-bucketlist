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
