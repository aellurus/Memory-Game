const arrayClassNames = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb",
]
const deck = document.querySelector(".deck");
const newDeck = document.querySelector('.deck');
const reset = document.getElementsByClassName('fa fa-repeat')[0];
let timerRunning = false;
let matchedCount = 0;
let moveCount = 0;
let starCount = 3;
let cardOne = null;
let cardTwo = null;
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
let modalParagraph = document.getElementsByClassName("modal-paragraph");
let scorePanel = document.getElementsByClassName("score-panel");

//Function that shuffles cards.
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Makes cards, shuffles.
function makeCards() {
    let shuffledArray = shuffle(arrayClassNames);

    deck.innerHTML = "";
    for (let x = 0; x < shuffledArray.length; x++) {
        const newCard = document.createElement('li');
        const newIcon = document.createElement('i');
        newCard.cover = shuffledArray[x];
        newCard.classList.add('card');
        newIcon.classList.add('fa');
        newIcon.classList = shuffledArray[x];
        const newDeck = document.querySelector('.deck');
        newDeck.appendChild(newCard);
        newCard.appendChild(newIcon);
        newCard.addEventListener('click', checkCard);
    }
}

// Modal: clicking on the x and anywhere outside the modal closes the modal
span.onclick = function() {
modal.style.display = "none";
}

window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

//The timer:
let time = document.getElementsByClassName('time')[0],
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function timer() {
        t = setTimeout(add, 1000);
    }

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

//Main function
function checkCard() {

    if (timerRunning === false) {
        timer();
        timerRunning = true;
    }

//Defining cards as cardOne or cardTwo.
    if (!cardOne) {
        cardOne = this;
        cardOne.removeEventListener('click', checkCard);
        cardOne.style.backgroundImage = cardOne.cover;
        cardOne.classList.add('open');
        cardOne.classList.add('show');
        return false;
    } else if (!cardTwo) {
        cardTwo = this;
        cardTwo.removeEventListener('click', checkCard);
        cardTwo.style.backgroundImage = cardTwo.cover;
        cardTwo.classList.add('open');
        cardTwo.classList.add('show');
        moveCount += 1;
        console.log('Total moves ' + moveCount);
        document.getElementsByTagName('span')[0].innerHTML = moveCount;
//Counting moves, removing stars.
        if (moveCount > 10 && moveCount < 21) {
            document.getElementsByClassName('fa fa-star')[2].style.visibility = 'hidden';
            starCount = 2;
        } else if (moveCount > 20) {
            document.getElementsByClassName('fa fa-star')[1].style.visibility = 'hidden';
            starCount = 1;
        }
//If there is a match.
        if (cardOne.firstChild.className === cardTwo.firstChild.className) {
            cardTwo.classList.add('match');
            cardTwo.classList.remove('open');
            cardTwo.classList.remove('show');
            cardOne.classList.add('match');
            cardOne.classList.remove('open');
            cardOne.classList.remove('show');
            cardOne = null;
            cardTwo = null;
            matchedCount += 1;
//Winning the game and the apperance of the modal.
            if (matchedCount === 8) {
                clearTimeout(t);
                modal.style.display = "block";
                for (let s = 0; s < starCount; s++) {
                    const modalStar = document.createElement('i');
                    modalStar.classList.add('fa', 'fa-star');
                    document.getElementsByClassName('modal-stars')[0].appendChild(modalStar);
                }
                document.getElementsByClassName('modal-moves')[0].innerHTML = moveCount;
                document.getElementsByClassName('modal-time')[0].innerHTML = time.textContent;
                console.log(starCount)
            }
            console.log('Total matches ' + matchedCount)
        } else {
            setTimeout(function() {
                cardTwo.addEventListener('click', checkCard);
                cardTwo.classList.remove('open');
                cardTwo.classList.remove('show');
                cardTwo.style.backgroundImage = 'none';
                cardOne.addEventListener('click', checkCard);
                cardOne.classList.remove('open');
                cardOne.classList.remove('show');
                cardOne.style.backgroundImage = 'none';
                cardOne = null;
                cardTwo = null;
            }, 1000);
        }
    }
}

//Resets game.
reset.addEventListener('click', resetGame);
function resetGame() {
  matchedCount = 0;
  moveCount = 0;
  clearTimeout(t);
  timerRunning = false;
  document.getElementsByClassName('time')[0],
  seconds = 0,
  minutes = 0,
  hours = 0,
  t;
  time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  document.getElementsByClassName('moves')[0].innerHTML = moveCount;
  document.getElementsByClassName('fa fa-star')[2].style.visibility = 'visible';
  document.getElementsByClassName('fa fa-star')[1].style.visibility = 'visible';
  document.getElementsByClassName('fa fa-star')[0].style.visibility = 'visible';
  shuffledArray = shuffle(arrayClassNames);
  makeCards(shuffledArray);
  console.log('Page is reloaded.')
  return false
}
makeCards();
