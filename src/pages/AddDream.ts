import { getHTMLElement } from "../utils/domHelpers.js";
import { Dream, Theme } from "../models/types.js";
import { Storage } from "../utils/storage.js";
import { defaultThemeOption, defaultThemes } from "../models/variables.js";
import { showExisting } from "../utils/notification.js";
import { checkLoggedInUser, setDisplayName } from "../utils/helpers.js";

const {save: saveDreams, getNewId: getNewIdDreams} = Storage<Dream>("dreams");
const {load: loadThemes} = Storage<Theme>("themes");

window.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();
  setDisplayName(getHTMLElement<HTMLSpanElement>("#user-name"));

  populateThemeSelection();

  const addDreamButton = getHTMLElement<HTMLButtonElement>("#add-dream");
  addDreamButton.addEventListener("click", handleAddDream);
});

function populateThemeSelection() {
  const themeSelection = getHTMLElement<HTMLSelectElement>("#dream-select");
  const themes = loadThemes() as Theme[] || defaultThemes;
  const topOption = document.createElement("option");
  topOption.value = "";
  topOption.text = defaultThemeOption;

  themeSelection.replaceChildren(topOption, ...themes.map(theme => {
    const option = document.createElement("option");
    option.value = theme.id.toString();
    option.text = theme.name;
    return option;
  }));
}

function handleAddDream() {
  const dreamName = getHTMLElement<HTMLInputElement>("#dream").value;
  if (!dreamName || dreamName === "") {
    const dreamNameError = getHTMLElement<HTMLDivElement>("#dream-error-message");
    showExisting(dreamNameError);
    return;
  }
  const dreamTheme = getHTMLElement<HTMLSelectElement>("#dream-select").value;
  if (!dreamTheme || dreamTheme === "") {
    const dreamThemeError = getHTMLElement<HTMLDivElement>("#theme-error-message");
    showExisting(dreamThemeError);
    return;
  }

  const newDream: Dream = {
    id: getNewIdDreams(),
    name: dreamName,
    themeId: parseInt(dreamTheme),
    checked: false
  };
  saveDreams(newDream);
  window.location.href = "dashboard.html";
}

