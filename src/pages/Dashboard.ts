import { getUser } from "../utils/storage.js";
import { elementNullCheck } from "../utils/domHelpers.js";
import { Dream, Dreams } from "../models/types.js";
import { getDreams, storeDreams } from "../utils/storage.js";

function buildListItem(dream: Dream) {
  const item = document.createElement("li");
  item.classList.add("dream-list_item");
  item.innerHTML = `
    <input class="dream-check" type="checkbox" name="dream-check" id="dream-check-${dream.id}" ${dream.checked ? "checked" : ""}>
    <label for="dream-check-${dream.id}">${dream.name}, <span class="dream-theme">${dream.theme}</span></label>
    <button type="button" id="dream-delete-${dream.id}"><img src="../assets/images/trash_delete.png"></button>
    `;

  return item;
}

function renderDreamList() {
  const dreamList = elementNullCheck<HTMLUListElement>(".dream-list");
  if (!dreamList) return;
  const dreams: Dreams = getDreams();
  ;
  if (!dreams) return;
  dreamList.addEventListener("click", handleDreamInteraction);

  dreamList.replaceChildren(...dreams.map(buildListItem));
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
  const dreams: Dreams = getDreams();
  const newDreams = dreams.filter((dream) => dream.id !== id);
  storeDreams(newDreams);
  renderDreamList();
}

function handleToggleDream(id: number) {
  const dreams: Dreams = getDreams();
  const dream = dreams.find((dream) => dream.id === id);
  if (!dream) return;
  dream.checked = !dream.checked;
  storeDreams(dreams);
  renderDreamList();
}

window.addEventListener('DOMContentLoaded', () => {
  const user = getUser();
  const userField = elementNullCheck<HTMLSpanElement>("#user-name");
  userField.textContent = user;

  renderDreamList();
});
