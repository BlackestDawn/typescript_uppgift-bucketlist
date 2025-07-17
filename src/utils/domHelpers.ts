// Nullkontroll
export function getHTMLElement<T extends HTMLElement>(selector: string, searchStart?: HTMLElement): T {
  const el = (searchStart || document).querySelector<T>(selector);
  if (!el) throw new Error(`${selector} not found.`);
  return el;
}
