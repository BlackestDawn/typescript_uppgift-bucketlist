// när användaren kommer in på sidan (DOMen laddats in), ska den omdirigeras till index.html eller dashboard.html
// beroende på om de klickat i "Kom ihåg mig"
import { checkLoggedInUser } from "../utils/helpers.js";

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    checkLoggedInUser();
    window.location.href = 'login.html';
  }, 4000); // 4000 ms = 4 sekunder
});
