import { Dream, Theme } from "./types.js";

export const defaultThemes: Theme[] = [
  { id: 1, name:"teknikdrömmar" },
  { id: 2, name: "vardagsdrömmar" },
  { id: 3, name: "husdrömmar" },
  { id: 4, name: "sportdrömmar" },
  { id: 5, name: "resdrömmar" }
];

export const defaultName = "NAMN";
export const minPasswordLength = 4;
export const defaultThemeOption = "-- Välj ett tema --";

export const defaultDreams: Dream[] = [{
    id: 1,
    name: "Lära mig HTML/CSS",
    themeId: 1,
    checked: true
},
{
    id: 2,
    name: "Lära mig TypeScript",
    themeId: 1,
    checked: false
},
{
    id: 3,
    name: "En dröm som tar flera rader lorem ipsum",
    themeId: 2,
    checked: false
}
];
