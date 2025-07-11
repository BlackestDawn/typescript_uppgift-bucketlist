// när användaren kommer in på sidan (DOMen laddats in), ska den omdirigeras till index.html eller dashboard.html
// beroende på om de klickat i "Kom ihåg mig"
import { getUser } from "../utils/storage.js";

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const user = getUser();
    if (user) {
        window.location.replace('dashboard.html');
    } else {
        window.location.replace('login.html');
    }
  }, 4000); // 4000 ms = 4 sekunder
});
