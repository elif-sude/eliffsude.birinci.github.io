const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const timerEl = document.getElementById('timer');
const stagePopup = document.getElementById('stage-popup-container');
const stageMessage = document.getElementById('stage-message');
const scoreBoardEl = document.createElement('div');
document.body.appendChild(scoreBoardEl);

let correctLetters = [];
let wrongLetters = [];
let currentStage = 1;
let currentWordIndex = 0;
let selectedWord = '';
let timer = null;
let timeLeft = 120;
let score = 0;
const maxScore = 15;
let gameOver = false; 

scoreBoardEl.id = 'score-board';
scoreBoardEl.style.position = 'absolute';
scoreBoardEl.style.top = '10px';
scoreBoardEl.style.right = '10px';
scoreBoardEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreBoardEl.style.padding = '10px';
scoreBoardEl.style.borderRadius = '5px';
scoreBoardEl.style.color = 'white';

const stages = [
    {
        words: ["apple", "grape", "melon", "kiwi", "peach"],
        hint: "Fruits",
    },
    {
        words: ["berlin", "tokyo", "madrid", "rome", "paris"],
        hint: "Cities",
    },
    {
        words: ["horse", "tiger", "zebra", "panda", "whale"],
        hint: "Animals",
    },
];

// Utility Functions
function updateScoreBoard() {
    scoreBoardEl.innerHTML = `
        <h3>Score Board</h3>
        <p>Score: ${score}/${maxScore}</p>
    `;
}

function startTimer() {
    stopTimer();
    timerEl.innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! The game is over.');
            endGame();
        }
    }, 1000);
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function getNextWord() {
    return stages[currentStage - 1].words[currentWordIndex];
}

function showCategoryHint() {
    const categoryPopup = document.getElementById('category-popup-container');
    const categoryMessage = document.getElementById('category-message');
    categoryMessage.innerText = `Category: ${stages[currentStage - 1].hint}`; // Just Category and Hint
    categoryPopup.style.display = 'flex'; // Show category popup

    setTimeout(() => {
        categoryPopup.style.display = 'none'; // Hide after 2 seconds
    }, 2000);
}

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

    const guessedWord = wordEl.innerText.replace(/\n/g, '');
    if (guessedWord === selectedWord) {
        score++;
        updateScoreBoard();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    showFinalScore();
                } else {
                    showStagePopup(); 
                }
            } else {
                correctLetters = [];
                wrongLetters = [];
                selectedWord = getNextWord();
                displayWord();
                updateWrongLetters();
            }
        }, 500);
    }
}

function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
        ${wrongLetters.map(letter => `<span style="margin-right: 10px;">${letter}</span>`).join('')}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        setTimeout(() => {
            endGame();
        }, 500);
    }
}

function endGame() {
    gameOver = true;
    stopTimer();
    popup.style.display = 'flex';
    messageEl.innerHTML = `<h2>Game Over</h2><p>Your Final Score: ${score}/${maxScore}</p>`;
}

function resetGame() {
    stopTimer();
    correctLetters = [];
    wrongLetters = [];
    timeLeft = 120;
    score = 0;
    currentStage = 1;
    gameOver = false;
    startStage();
}

function showStagePopup() {
    stageMessage.innerHTML = `
        <h2>Stage Completed!</h2>
        <p>Moving to the next stage.</p>
    `;
    stagePopup.style.display = 'flex';

    setTimeout(() => {
        stagePopup.style.display = 'none';
        currentStage++;
        timeLeft = 120;
        startStage();
    }, 2000);
}

function showFinalScore() {
    popup.style.display = 'flex';
    messageEl.innerHTML = `
        <h2>Congratulations!</h2>
        <p>Your Final Score: ${score}/${maxScore}</p>
    `;
}

playAgainBtn.addEventListener('click', () => {
    resetGame();
    popup.style.display = 'none';
});

window.addEventListener('keydown', e => {
    if (gameOver) return;

    const letter = e.key.toLowerCase();
    const normalizedLetter = letter.normalize('NFD').replace(/\u0300-\u036f/g, '');

    if (/^[a-zA-ZğüşöçİĞÜŞÖÇ]$/.test(normalizedLetter)) {
        if (selectedWord.includes(normalizedLetter)) {
            if (!correctLetters.includes(normalizedLetter)) {
                correctLetters.push(normalizedLetter);
                displayWord();
            } else {
                message.classList.add('show');
                setTimeout(() => {
                    message.classList.remove('show');
                }, 2000);
            }
        } else {
            if (!wrongLetters.includes(normalizedLetter)) {
                wrongLetters.push(normalizedLetter);
                updateWrongLetters();
            } else {
                message.classList.add('show');
                setTimeout(() => {
                    message.classList.remove('show');
                }, 2000);
            }
        }
    }
});

function showGameExplanation() {
    alert('Welcome to the Hangman Game!\n\nIn this game, you need to guess the hidden word by entering letters.\nEach time you guess wrong, part of the hangman will be drawn.\nYou have 120 seconds to complete each stage.\nGood luck!');
}

function startStage() {
    if (currentStage === 1) {  
        showGameExplanation(); 
    }
    correctLetters = [];
    wrongLetters = [];
    currentWordIndex = 0;
    selectedWord = getNextWord();
    showCategoryHint();
    displayWord();
    updateWrongLetters();
    updateScoreBoard();
    startTimer();
}

startStage();



