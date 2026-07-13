const kitchenGrid = document.getElementById('kitchenGrid');
const scoreLinaEl = document.getElementById('scoreLina');
const scoreNonnaEl = document.getElementById('scoreNonna');
const turnLabelEl = document.getElementById('turnLabel');
const pairsLeftEl = document.getElementById('pairsLeft');
const recipeTextEl = document.getElementById('recipeText');
const btnKitchenReset = document.getElementById('btnKitchenReset');
const btnKitchenLinaStarts = document.getElementById('btnKitchenLinaStarts');
const btnKitchenNonnaStarts = document.getElementById('btnKitchenNonnaStarts');
const moveCountEl = document.getElementById('moveCount');
const timerDisplayEl = document.getElementById('timerDisplay');

const avatarLina = document.getElementById('avatarLina');
const avatarNonna = document.getElementById('avatarNonna');

function updateTurnAvatars() {
  if (!avatarLina || !avatarNonna) return;
  if (kitchenState.turn === 'Lina') {
    avatarLina.classList.add('active');
    avatarNonna.classList.remove('active');
  } else {
    avatarNonna.classList.add('active');
    avatarLina.classList.remove('active');
  }
}

const kitchenItems = [
  { id: 'pizza', label: 'Pizza', emoji: '🍕', recipe: 'Nonna: Tell Lina about how you like to make pizza at home.' },
  { id: 'pasta', label: 'Pasta', emoji: '🍝', recipe: 'Talk about your favorite pasta dish together.' },
  { id: 'tamales', label: 'Tamales', emoji: '🌯', recipe: 'Share a memory of eating Mexican tamales with family.' },
  { id: 'gelato', label: 'Gelato', emoji: '🍨', recipe: 'Remember a time you had gelato together. Which flavor wins?' },
  { id: 'texasbbq', label: 'Texas BBQ', emoji: '🍖', recipe: 'Describe your favorite Texas barbecue meal and sides.' },
  { id: 'school', label: 'School Lunch', emoji: '🍱', recipe: 'Lina: talk about a school lunch you liked or disliked.' },
  { id: 'italy', label: 'Italy', emoji: '🇮🇹', recipe: 'Tell a story from Italy – a street, shop, or festival.' },
  { id: 'texas', label: 'Texas', emoji: '🤠', recipe: 'Share something you love about living in Texas now.' }
];

let kitchenState = {
  turn: 'Lina',
  scoreLina: 0,
  scoreNonna: 0,
  pairsLeft: kitchenItems.length,
  flippedIndices: [],
  locked: false
};

let moveCount = 0;
let timerInterval = null;
let secondsElapsed = 0;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startTimer() {
  clearInterval(timerInterval);
  secondsElapsed = 0;
  if (timerDisplayEl) timerDisplayEl.textContent = '00:00';
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const m = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const s = String(secondsElapsed % 60).padStart(2, '0');
    if (timerDisplayEl) timerDisplayEl.textContent = `${m}:${s}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function buildKitchenGrid(startTurn = 'Lina') {
  if (!kitchenGrid) return;

  kitchenGrid.innerHTML = '';
  kitchenState.turn = startTurn;
  kitchenState.scoreLina = 0;
  kitchenState.scoreNonna = 0;
  kitchenState.pairsLeft = kitchenItems.length;
  kitchenState.flippedIndices = [];
  kitchenState.locked = false;

  moveCount = 0;
  if (moveCountEl) moveCountEl.textContent = '0';

  document.querySelector('.win-overlay')?.remove();

  const deck = [];
  kitchenItems.forEach(item => {
    deck.push({ ...item });
    deck.push({ ...item });
  });

  shuffleArray(deck);

  deck.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = cardData.id;
    card.dataset.index = index.toString();

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const back = document.createElement('div');
    back.className = 'card-back';
    back.textContent = '🍴';

    const front = document.createElement('div');
    front.className = 'card-face';
    front.innerHTML = `
      <div class="card-emoji">${cardData.emoji}</div>
      <div class="card-caption">${cardData.label}</div>
    `;

    inner.appendChild(back);
    inner.appendChild(front);
    card.appendChild(inner);

    card.addEventListener('click', () => handleKitchenCardClick(card));
    kitchenGrid.appendChild(card);
  });

  scoreLinaEl.textContent = kitchenState.scoreLina.toString();
  scoreNonnaEl.textContent = kitchenState.scoreNonna.toString();
  turnLabelEl.textContent = kitchenState.turn;
  pairsLeftEl.textContent = kitchenState.pairsLeft.toString();
  recipeTextEl.textContent =
    'Find a matching pair to unlock a story prompt about food, places, and family.';

  updateTurnAvatars();
  startTimer();
}

function handleKitchenCardClick(card) {
  if (kitchenState.locked) return;
  if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  kitchenState.flippedIndices.push(card.dataset.index);

  if (kitchenState.flippedIndices.length === 2) {
    kitchenState.locked = true;
    moveCount++;
    if (moveCountEl) moveCountEl.textContent = moveCount.toString();

    const [idx1, idx2] = kitchenState.flippedIndices;
    const card1 = kitchenGrid.querySelector(`.card[data-index="${idx1}"]`);
    const card2 = kitchenGrid.querySelector(`.card[data-index="${idx2}"]`);

    if (!card1 || !card2) {
      kitchenState.flippedIndices = [];
      kitchenState.locked = false;
      return;
    }

    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;

    if (id1 === id2) {
      setTimeout(() => {
        card1.classList.add('matched', 'disabled');
        card2.classList.add('matched', 'disabled');

        if (kitchenState.turn === 'Lina') kitchenState.scoreLina++;
        else kitchenState.scoreNonna++;

        kitchenState.pairsLeft--;

        scoreLinaEl.textContent = kitchenState.scoreLina.toString();
        scoreNonnaEl.textContent = kitchenState.scoreNonna.toString();
        pairsLeftEl.textContent = kitchenState.pairsLeft.toString();

        const item = kitchenItems.find(x => x.id === id1);
        if (item) recipeTextEl.textContent = item.recipe;

        if (kitchenState.pairsLeft <= 0) {
          stopTimer();
          recipeTextEl.textContent =
            'All pairs found! Celebrate with a snack or special meal together.';
          showWinOverlay();
        }

        kitchenState.flippedIndices = [];
        kitchenState.locked = false;
      }, 500);
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');

        kitchenState.turn = kitchenState.turn === 'Lina' ? 'Nonna' : 'Lina';
        turnLabelEl.textContent = kitchenState.turn;

        updateTurnAvatars();

        kitchenState.flippedIndices = [];
        kitchenState.locked = false;
      }, 900);
    }
  }
}

function showWinOverlay() {
  const winnerName =
    kitchenState.scoreLina === kitchenState.scoreNonna
      ? "It's a tie"
      : kitchenState.scoreLina > kitchenState.scoreNonna
      ? 'Lina wins this round'
      : 'Nonna wins this round';

  const overlay = document.createElement('div');
  overlay.className = 'win-overlay';
  overlay.innerHTML = `
    <div class="win-card">
      <h2>🎉 All pairs found! 🎉</h2>
      <p class="win-subtitle">${winnerName}</p>
      <p class="win-stats">Time: ${timerDisplayEl ? timerDisplayEl.textContent : '00:00'} &bull; Moves: ${moveCount}</p>
      <button id="playAgainBtn" class="btn primary">Play again</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('playAgainBtn').addEventListener('click', () => {
    overlay.remove();
    buildKitchenGrid(kitchenState.turn === 'Lina' ? 'Nonna' : 'Lina');
  });
}

export function initKitchenGame() {
  if (!kitchenGrid) return;

  buildKitchenGrid('Lina');
  updateTurnAvatars();

  btnKitchenReset?.addEventListener('click', () => buildKitchenGrid(kitchenState.turn));
  btnKitchenLinaStarts?.addEventListener('click', () => buildKitchenGrid('Lina'));
  btnKitchenNonnaStarts?.addEventListener('click', () => buildKitchenGrid('Nonna'));
}
