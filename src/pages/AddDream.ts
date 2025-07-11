import { elementNullCheck } from "../utils/domHelpers.js";
import { Dreams, Dream } from "../models/types.js";
import { getUser, getDreams, storeDreams, getThemes } from "../utils/storage.js";
import { defaultThemeOption } from "../models/variables.js";
import { showExisting } from "../utils/notification.js";

window.addEventListener('DOMContentLoaded', () => {
  const user = getUser();
  const userField = elementNullCheck<HTMLSpanElement>("#user-name");
  userField.textContent = user;

  populateThemeSelection();

  const addDreamButton = elementNullCheck<HTMLButtonElement>("#add-dream");
  addDreamButton.addEventListener("click", handleAddDream);
});

function populateThemeSelection() {
  const themeSelection = elementNullCheck<HTMLSelectElement>("#dream-select");
  const themes = getThemes();
  const topOption = document.createElement("option");
  topOption.value = "";
  topOption.text = defaultThemeOption;

  themeSelection.replaceChildren(topOption, ...themes.map(theme => {
    const option = document.createElement("option");
    option.value = theme;
    option.text = theme;
    return option;
  }));
}

function handleAddDream() {
  const dreamName = elementNullCheck<HTMLInputElement>("#dream").value;
  if (!dreamName || dreamName === "") {
    const dreamNameError = elementNullCheck<HTMLDivElement>("#dream-error-message");
    showExisting(dreamNameError);
    return;
  }
  const dreamTheme = elementNullCheck<HTMLSelectElement>("#dream-select").value;
  if (!dreamTheme || dreamTheme === "") {
    const dreamThemeError = elementNullCheck<HTMLDivElement>("#theme-error-message");
    showExisting(dreamThemeError);
    return;
  }

  const dreams: Dreams = getDreams();
  const highestId = dreams.reduce((max, dream) => Math.max(max, dream.id), 0);
  const newDream: Dream = {
    id: highestId + 1,
    name: dreamName,
    theme: dreamTheme,
    checked: false
  };
  dreams.push(newDream);
  storeDreams(dreams);
  window.location.replace("dashboard.html");
}

