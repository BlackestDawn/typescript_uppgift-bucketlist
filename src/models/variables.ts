import { Dream } from "./types.js";

export let themes = ["teknikdrömmar", "vardagsdrömmar", "husdrömmar", "sportdrömmar", "resdrömmar"];
export const defaultName = "NAMN";
export const minPasswordLength = 4;

export const dreams: Dream[] = [{
    id: 1,
    name: "Lära mig HTML/CSS",
    theme: "teknikdrömmar",
    checked: true
},
{
    id: 2,
    name: "Lära mig TypeScript",
    theme: "teknikdrömmar",
    checked: false
},
{
    id: 3,
    name: "En dröm som tar flera rader lorem ipsum",
    theme: "vardagsdrömmar",
    checked: false
}
]