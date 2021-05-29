'use strict';
//Selecting elements
// const score0l = document.querySelector('#score--0');
const score0l = document.getElementById('score--0');
const player0l = document.querySelector('.player--0');
const player1l = document.querySelector('.player--1');

//isntead we can also do this
const score1l = document.getElementById('score--1');

const dicel = document.querySelector('.dice');

const current0l = document.getElementById('current--0');

const current1l = document.getElementById('current--1');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

//Reseting the game
// const reset = function () {
//   document.getElementById(`score--0`)=0;
//   document.getElementById('score--1')=0;
//   document.getElementById('current--0')=0;
//   document.getElementById('current--1')=0;

// };

//Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  // score0l.textContent = 0;
  // score1l.textContent = 0;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0l.textContent = 0;
  score1l.textContent = 0;
  current0l.textContent = 0;
  current1l.textContent = 0;

  dicel.classList.add('hidden');
  // document.getElementById(`score--0`).textContent = 0;
  // document.getElementById('score--1').textContent = 0;
  // document.getElementById('current--0').textContent = 0;
  // document.getElementById('current--1').textContent = 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove(`player--winner`);
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove(`player--active`);
  player0l.classList.remove('player--winner');
  player1l.classList.remove('player--winner');
  player0l.classList.add('player--active');
  player1l.classList.remove('player--active');
};
init();

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0l.classList.toggle('player--active');
  player1l.classList.toggle('player--active');
};

//Rolling dice functionality
btnroll.addEventListener('click', function () {
  if (playing) {
    //Generatinng a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display dice
    dicel.classList.remove('hidden');
    dicel.src = `dice-${dice}.png`;

    //Check for rolled 1: if true, switch to the other player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0l.textContent = currentScore; //CHANGE PLAYER
    } else {
      //switch to the next player
      switchplayer();
    }
  }
});
btnhold.addEventListener('click', function () {
  if (playing) {
    //Add current score to the player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if player's score is >=100;
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--active`);
      playing = false;
      dicel.classList.add('hidden');
    } else {
      switchplayer();
    }
  }
});

//Reset button
btnnew.addEventListener('click', init);
