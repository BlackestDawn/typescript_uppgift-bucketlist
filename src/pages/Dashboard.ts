import { checkLoggedInUser, setDisplayName } from "../utils/helpers.js";
import { getHTMLElement } from "../utils/domHelpers.js";
import { Dream, Theme } from "../models/types.js";
import { save, load, remove } from "../utils/storage.js";

function buildListItem(dream: Dream) {
  const item = document.createElement("li");
  item.classList.add("dream-list_item");
  const theme = load<Theme>('themes', dream.themeId) as Theme;
  item.innerHTML = `
    <input class="dream-check" type="checkbox" name="dream-check" id="dream-check-${dream.id}" ${dream.checked ? "checked" : ""}>
    <label for="dream-check-${dream.id}">${dream.name}, <span class="dream-theme">${theme.name || "Unknown dream type"}</span></label>
    <button type="button" id="dream-delete-${dream.id}"><img src="../assets/images/trash_delete.png"></button>
    `;

  return item;
}

function renderDreamList() {
  const dreamList = getHTMLElement<HTMLUListElement>(".dream-list");
  if (!dreamList) return;
  const dreams: Dream[] = load<Dream>("dreams") as Dream[];

  if (dreams) {
    dreamList.addEventListener("click", handleDreamInteraction);
    dreamList.replaceChildren(...dreams.map(buildListItem));
  } else {
    const text = document.createElement("p");
    text.textContent = "Vi hittade inga drömmar."
    dreamList.replaceChildren(text);
  }
}

function handleDreamInteraction(event: Event) {
  const target = event.target as HTMLElement;
  const checkbox = target.closest("input[type='checkbox']");
  if (checkbox) {
  const id = parseInt(checkbox.id.split("-")[2]);
    handleToggleDream(id);
  }
  const button = target.closest("button");
  if (button) {
    const id = parseInt(button.id.split("-")[2]);
    handleDeleteDream(id);
  }
}


function handleDeleteDream(id: number) {
  remove('dreams', id);
  renderDreamList();
}

function handleToggleDream(id: number) {
  const dreams: Dream[] = load<Dream>("dreams") as Dream[];
  const dream = dreams.find((dream) => dream.id === id);
  if (!dream) return;
  dream.checked = !dream.checked;
  save('dreams', dream);
  renderDreamList();
}

window.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();
  setDisplayName(getHTMLElement<HTMLSpanElement>("#user-name"));
  renderDreamList();
});
