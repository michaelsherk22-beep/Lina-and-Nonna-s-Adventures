import { initRouter } from './router.js';
import { initKitchenGame } from './kitchen.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initKitchenGame();
});
