// Nullkontroll
export function elementNullCheck<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`${selector} not found.`);
  return el;
}
