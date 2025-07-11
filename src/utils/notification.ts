export function showSuccess(message: string, element: HTMLElement, timeout?: number) {
  element.innerHTML = message;
  element.style.display = "block";
  const timeoutMs = (timeout ? timeout : 5) * 1000;
  setTimeout(() => {
    element.style.display = "none";
  }, timeoutMs);
}

export function showError(message: string, element: HTMLElement, timeout?: number) {
  element.innerHTML = message;
  element.style.display = "block";
  const timeoutMs = (timeout ? timeout : 5) * 1000;
  setTimeout(() => {
    element.style.display = "none";
  }, timeoutMs);
}

export function showExisting(element: HTMLElement, timeout?: number) {
  element.style.display = "block";
  const timeoutMs = (timeout ? timeout : 5) * 1000;
  setTimeout(() => {
    element.style.display = "none";
  }, timeoutMs);
}
