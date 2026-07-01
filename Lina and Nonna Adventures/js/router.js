export function initRouter() {
  const menuButtons = document.querySelectorAll('.menu-grid button, .hero-actions .btn');
  const gameContainers = {
    kitchen: document.getElementById('game-kitchen'),
    travel: document.getElementById('game-travel'),
    memoryStories: document.getElementById('game-memoryStories'),
    puzzle: document.getElementById('game-puzzle'),
    dressup: document.getElementById('game-dressup')
  };

  function showGame(name) {
    Object.entries(gameContainers).forEach(([key, el]) => {
      if (!el) return;
      if (key === name) el.classList.add('active');
      else el.classList.remove('active');
    });
  }

  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const gameName = btn.getAttribute('data-game');
      if (gameName && gameContainers[gameName]) {
        showGame(gameName);
      }
    });
  });

  // default
  showGame('kitchen');
}