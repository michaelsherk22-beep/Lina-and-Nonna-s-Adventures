import { initRouter } from './router.js';
import { initKitchenGame } from './games/kitchen.js';
// later: import other games as you build them

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initKitchenGame();
  // initTravelGame();
  // initStoriesGame();
  // initPuzzleGame();
  // initDressupGame();
});