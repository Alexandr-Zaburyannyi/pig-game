'use strict';

const score1El = document.querySelector('#score--0');

const score2El = document.querySelector('#score--1');

const currentScore1 = document.querySelector('#current--0');

const currentScore2 = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const player1 = document.querySelector('.player--0');

const player2 = document.querySelector('.player--1');

const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

(function () {
  let imageRandomizer;
  let currentScore = 0;
  let activePlayer = 0;

  const scores = [0, 0];

  score1El.textContent = scores[0];
  score2El.textContent = scores[1];

  diceEl.classList.add('hidden');

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (imageRandomizer =
      Math.floor(Math.random() * (max - min + 1)) + min);
  }

  btnRoll.addEventListener('click', () => {
    getRandomInt(1, 6);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${imageRandomizer}.png`;
    if (imageRandomizer !== 1) {
      currentScore += imageRandomizer;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      document
        .querySelector(`#current--${activePlayer}`)
        .parentElement.parentElement.classList.remove('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      document
        .querySelector(`#current--${activePlayer}`)
        .parentElement.parentElement.classList.add('player--active');
    }
  });

  btnHold.addEventListener('click', () => {
    document.querySelector(`#score--${activePlayer}`).textContent =
      currentScore +
      Number(document.querySelector(`#score--${activePlayer}`).textContent);

    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document
      .querySelector(`#score--${activePlayer}`)
      .parentElement.classList.remove('player--active');

    currentScore = 0;
    if (document.querySelector(`#score--${activePlayer}`).textContent >= 100) {
      document
        .querySelector(`#score--${activePlayer}`)
        .parentElement.classList.add('player--winner');
    } else {
      activePlayer = activePlayer === 0 ? 1 : 0;

      document
        .querySelector(`#score--${activePlayer}`)
        .parentElement.classList.add('player--active');
    }
  });
  btnNew.addEventListener('click', () => {
    again();
  });
  function again() {
    score1El.textContent = scores[0];
    score2El.textContent = scores[1];
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
})();
