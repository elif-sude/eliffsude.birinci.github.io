//kodun ilk hali
/*const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');

const correctLetters=[];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord(){
    const words = ["javascırpt","java", "python","css","html"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord(){
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}

            </div>
        `).join('')}
    
    `;
    const w = word_el.innerText.replace(/\n/g, '');
    if(w === selectedWord){
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandınız.';
    }
}
function updateWrongLetters() {
    wrongLetters_el.innerHTML=`
        ${wrongLetters.length>0?'<h3>Hatalı Harfler</h3>': ''}
        ${wrongLetters.map(letter=> `<span>${letter}<span>`)}
    `;
    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if(index<errorCount){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
    if(wrongLetters.length === items.length){
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz.';
    }
}
function displayMessage(){
    message.classList.add('show');

    setTimeout(function(){
        message.classList.remove('show');
    },2000);
}
PlayAgainBtn.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

window.addEventListener('keydown', function(e){
    if(e.keyCode >=65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                displayMessage();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
                displayMessage();
            }
        }
    }
   
});

displayWord()*/
////////////////////////////////////////////////////////////////////////

// Element referansları
/*const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

// Oyun durumu değişkenleri
const correctLetters = [];
const wrongLetters = [];
let currentStage = 1; // Mevcut etap
let currentWordIndex = 0; // Etaptaki mevcut kelime
let selectedWord = '';

// Etap bilgileri
const stages = [
    {
        words: ["cam", "kan", "fal", "can", "kal"],
        hint: "Bu etap bitkilerden oluşmaktadır."
    },
    {
        words: ["kale", "kule", "vale", "adem", "kara"],
        hint: "Bu etap hayvanlardan oluşmaktadır."
    },
    {
        words: ["pembe", "feyza", "bardak", "tabak", "karam"],
        hint: "Bu etap şehirlerden oluşmaktadır."
    }
];

// Kelime seçici
function getNextWord() {
    const words = stages[currentStage - 1].words;
    return words[currentWordIndex];
}

// Kelimeyi göster
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

    const w = wordEl.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    popup.style.display = 'flex';
                    messageEl.innerText = 'Tebrikler! Tüm etapları tamamladınız.';
                } else {
                    alert('Tebrikler, bir sonraki etaba geçtiniz!');
                    currentStage++;
                    currentWordIndex = 0;
                    startStage();
                }
            } else {
                correctLetters.splice(0);
                wrongLetters.splice(0);
                selectedWord = getNextWord();
                displayWord();
                updateWrongLetters();
            }
        }, 500); // Harflerin görünmesi için gecikme
    }
}

// Hatalı harfleri güncelle
function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
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
            alert('Adam asıldı, etap yeniden başlıyor!');
            resetStage();
        }, 500); // Mesaj için gecikme
    }
}

// Etabı başlat
function startStage() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    currentWordIndex = 0;
    selectedWord = getNextWord();
    displayHint();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
}

// Etap ipucunu göster
function displayHint() {
    alert(stages[currentStage - 1].hint);
}

// Etabı sıfırla
function resetStage() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    startStage();
}

// Mesaj göster
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

// Tekrar oyna butonu
playAgainBtn.addEventListener('click', function () {
    if (currentStage === stages.length && popup.style.display === 'flex') {
        currentStage = 1;
    }
    startStage();
});

// Klavye dinleyici
window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

// İlk etap başlatma
startStage();*/

// Element referansları
/*const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

// Oyun durumu değişkenleri
const correctLetters = [];
const wrongLetters = [];
let currentStage = 1; // Mevcut etap
let currentWordIndex = 0; // Etaptaki mevcut kelime
let selectedWord = '';
let timer; // Zamanlayıcı

// Etap bilgileri
const stages = [
    {
        words: ["apple", "banana", "cherry", "grape", "orange"],
        hint: "This stage consists of fruits."
    },
    {
        words: ["london", "paris", "tokyo", "berlin", "madrid"],
        hint: "This stage consists of cities."
    },
    {
        words: ["dog", "cat", "horse", "elephant", "tiger"],
        hint: "This stage consists of animals."
    }
];

// Zamanlayıcı başlatıcı
function startTimer() {
    let timeLeft = 120; // 2 dakika
    const timerEl = document.getElementById('timer');

    timerEl.innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Restarting the stage.');
            resetStage();
        }
    }, 1000);
}

// Zamanlayıcı durdurucu
function stopTimer() {
    clearInterval(timer);
}

// Kelime seçici
function getNextWord() {
    const words = stages[currentStage - 1].words;
    return words[currentWordIndex];
}

// Kelimeyi göster
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

    const w = wordEl.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        stopTimer();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    popup.style.display = 'flex';
                    messageEl.innerText = 'Congratulations! You completed all stages.';
                } else {
                    alert('Congratulations, moving to the next stage!');
                    currentStage++;
                    currentWordIndex = 0;
                    startStage();
                }
            } else {
                correctLetters.splice(0);
                wrongLetters.splice(0);
                selectedWord = getNextWord();
                displayWord();
                updateWrongLetters();
            }
        }, 500); // Harflerin görünmesi için gecikme
    }
}

// Hatalı harfleri güncelle
function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
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
        stopTimer();
        setTimeout(() => {
            alert('The man is hanged, restarting the stage!');
            resetStage();
        }, 500); // Mesaj için gecikme
    }
}

// Etabı başlat
function startStage() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    currentWordIndex = 0;
    selectedWord = getNextWord();
    displayHint();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
    startTimer();
}

// Etap ipucunu göster
function displayHint() {
    alert(stages[currentStage - 1].hint);
}

// Etabı sıfırla
function resetStage() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    stopTimer();
    startStage();
}

// Mesaj göster
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

// Tekrar oyna butonu
playAgainBtn.addEventListener('click', function () {
    if (currentStage === stages.length && popup.style.display === 'flex') {
        currentStage = 1;
    }
    startStage();
});

// Klavye dinleyici
window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

// İlk etap başlatma
startStage();*/

/*// Element referansları (sadece ingilizce kelime hatası var iüşç)
// Element referansları
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

// Oyun durumu değişkenleri
const correctLetters = [];
const wrongLetters = [];
let currentStage = 1; // Mevcut etap
let currentWordIndex = 0; // Etaptaki mevcut kelime
let selectedWord = '';
let timer; // Zamanlayıcı
let timeLeft = 120; // Her etap için başlangıç süresi (2 dakika)

// Etap bilgileri
const stages = [
    {
        words: ["apple", "banana", "cherry", "grape", "orange"],
        hint: "This stage consists of fruits."
    },
    {
        words: ["london", "paris", "tokyo", "berlin", "madrid"],
        hint: "This stage consists of cities."
    },
    {
        words: ["dog", "cat", "horse", "elephant", "tiger"],
        hint: "This stage consists of animals."
    }
];

// Zamanlayıcı başlatıcı
function startTimer() {
    const timerEl = document.getElementById('timer');
    timerEl.innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Restarting the stage.');
            resetStage(); // Etap sıfırla
        }
    }, 1000);
}

// Zamanlayıcı durdurucu
function stopTimer() {
    clearInterval(timer);
}

// Kelime seçici
function getNextWord() {
    const words = stages[currentStage - 1].words;
    return words[currentWordIndex];
}

// Kelimeyi göster
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

    const w = wordEl.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    popup.style.display = 'flex';
                    messageEl.innerText = 'Congratulations! You completed all stages.';
                } else {
                    alert('Congratulations, moving to the next stage!');
                    currentStage++;
                    currentWordIndex = 0;
                    timeLeft = 120; // Yeni etapta süre yenilenir
                    startStage();
                }
            } else {
                correctLetters.splice(0);
                wrongLetters.splice(0);
                selectedWord = getNextWord();
                displayWord();
                updateWrongLetters();
            }
        }, 500); // Harflerin görünmesi için gecikme
    }
}

// Hatalı harfleri güncelle
function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
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
            alert('The man is hanged, restarting the stage!');
            resetStage(); // Etap sıfırla
        }, 500); // Mesaj için gecikme
    }
}

// Etabı başlat
function startStage() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    currentWordIndex = 0;
    selectedWord = getNextWord();
    displayHint();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';

    // Timer sadece ilk etapta başlar veya resetStage çağrıldığında yeniden başlar
    if (!timer) {
        startTimer();
    }
}

// Etap ipucunu göster
function displayHint() {
    alert(stages[currentStage - 1].hint);
}

// Etabı sıfırla
function resetStage() {
    stopTimer(); // Timerı durdur
    timer = null; // Timer referansını sıfırla
    timeLeft = 120; // Süreyi sıfırla
    startStage(); // Etabı yeniden başlat
}

// Mesaj göster
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

// Tekrar oyna butonu
playAgainBtn.addEventListener('click', function () {
    if (currentStage === stages.length && popup.style.display === 'flex') {
        currentStage = 1;
    }
    startStage();
});

// Klavye dinleyici
window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

// İlk etap başlatma
startStage();
*/




// Element referansları
/*const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');

// Oyun durumu değişkenleri
const correctLetters = [];
const wrongLetters = [];
let currentStage = 1; // Mevcut etap
let currentWordIndex = 0; // Etaptaki mevcut kelime
let selectedWord = '';
let timer; // Zamanlayıcı
let timeLeft = 120; // Her etap için başlangıç süresi (2 dakika)

// Etap bilgileri
const stages = [
    {
        words: ["apple", "banana", "cherry", "grape", "orange"],
        hint: "This stage consists of fruits."
    },
    {
        words: ["london", "paris", "tokyo", "berlin", "madrid"],
        hint: "This stage consists of cities."
    },
    {
        words: ["dog", "cat", "horse", "elephant", "tiger"],
        hint: "This stage consists of animals."
    }
];

// Zamanlayıcı başlatıcı
function startTimer() {
    const timerEl = document.getElementById('timer');
    timerEl.innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Restarting the stage.');
            resetStage(); // Etap sıfırla
        }
    }, 1000);
}

// Zamanlayıcı durdurucu
function stopTimer() {
    clearInterval(timer);
}

// Kelime seçici
function getNextWord() {
    const words = stages[currentStage - 1].words;
    return words[currentWordIndex];
}

// Kelimeyi göster
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
        `).join('')}
    `;

    const w = wordEl.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    popup.style.display = 'flex';
                    messageEl.innerText = 'Congratulations! You completed all stages.';
                } else {
                    alert('Congratulations, moving to the next stage!');
                    currentStage++;
                    currentWordIndex = 0;
                    timeLeft = 120; // Yeni etapta süre yenilenir
                    startStage();
                }
            } else {
                correctLetters.splice(0);
                wrongLetters.splice(0);
                selectedWord = getNextWord();
                displayWord();
                updateWrongLetters();
            }
        }, 500); // Harflerin görünmesi için gecikme
    }
}

// Hatalı harfleri güncelle
function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
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
            alert('The man is hanged, restarting the stage!');
            resetStage(); // Etap sıfırla
        }, 500); // Mesaj için gecikme
    }
}

// Etabı başlat
function startStage() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    currentWordIndex = 0;
    selectedWord = getNextWord();
    displayHint();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';

    // Timer sadece ilk etapta başlar veya resetStage çağrıldığında yeniden başlar
    if (!timer) {
        startTimer();
    }
}

// Etap ipucunu göster
function displayHint() {
    alert(stages[currentStage - 1].hint);
}

// Etabı sıfırla
function resetStage() {
    stopTimer(); // Timerı durdur
    timer = null; // Timer referansını sıfırla
    timeLeft = 120; // Süreyi sıfırla
    startStage(); // Etabı yeniden başlat
}

// Mesaj göster
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

// Türkçe karakter desteği ekleyici
function normalizeTurkishCharacters(letter) {
    const mapping = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
    };
    return mapping[letter] || letter;
}

// Tekrar oyna butonu
playAgainBtn.addEventListener('click', function () {
    if (currentStage === stages.length && popup.style.display === 'flex') {
        currentStage = 1;
    }
    startStage();
});

// Klavye dinleyici
window.addEventListener('keydown', function (e) {
    const letter = normalizeTurkishCharacters(e.key);

    if (/^[a-zA-Z]$/.test(letter)) {
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

// İlk etap başlatma
startStage();*/

/*// Hangman Game Script Updated to End on Hanging
//her şeyi tam ikinci defa oynndığunda zaman fazla hızlı akıyor
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const timerEl = document.getElementById('timer');
const scoreBoardEl = document.createElement('div');
document.body.appendChild(scoreBoardEl);

// Game State Variables
let correctLetters = [];
let wrongLetters = [];
let currentStage = 1;
let currentWordIndex = 0;
let selectedWord = '';
let timer;
let timeLeft = 120; // 120 seconds per stage
let score = 0; // Starts from 0
const maxScore = 15; // Max score possible

scoreBoardEl.id = 'score-board';
scoreBoardEl.style.position = 'absolute';
scoreBoardEl.style.top = '10px';
scoreBoardEl.style.right = '10px';
scoreBoardEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreBoardEl.style.padding = '10px';
scoreBoardEl.style.borderRadius = '5px';
scoreBoardEl.style.color = 'white';

// Stages and Words
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
    clearInterval(timer);
}

function getNextWord() {
    return stages[currentStage - 1].words[currentWordIndex];
}

function displayHint() {
    const hintEl = document.createElement('div');
    hintEl.id = 'hint';
    hintEl.innerHTML = `<h3>${stages[currentStage - 1].hint}</h3>`;
    hintEl.style.position = 'absolute';
    hintEl.style.top = '50%';
    hintEl.style.left = '50%';
    hintEl.style.transform = 'translate(-50%, -50%)';
    hintEl.style.backgroundColor = '#222';
    hintEl.style.color = 'white';
    hintEl.style.padding = '20px';
    hintEl.style.border = '3px solid white';
    hintEl.style.borderRadius = '10px';
    hintEl.style.fontSize = '1.5rem';
    hintEl.style.textAlign = 'center';
    document.body.appendChild(hintEl);
    setTimeout(() => {
        document.body.removeChild(hintEl);
    }, 3000);
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
        score++; // Increment score for a correct word
        updateScoreBoard();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    showFinalScore();
                } else {
                    alert('Stage completed! Moving to the next stage.');
                    currentStage++;
                    timeLeft = 120; // Reset timer for new stage
                    startStage();
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
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
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
        alert('The man is hanged! The game is over.');
        endGame();
    }
}

function endGame() {
    stopTimer();
    popup.style.display = 'flex';
    messageEl.innerHTML = `<h2>Game Over</h2><p>Your Final Score: ${score}/${maxScore}</p>`;
}

function resetGame() {
    stopTimer();
    correctLetters = [];
    wrongLetters = [];
    timeLeft = 120;
    score = 0; // Reset score for a new game
    currentStage = 1; // Reset to first stage
    startStage();
}

function showFinalScore() {
    popup.style.display = 'flex';
    messageEl.innerHTML = `
        <h2>Congratulations!</h2>
        <p>Your Final Score: ${score}/${maxScore}</p>
    `;
}

// Event Listeners
playAgainBtn.addEventListener('click', () => {
    resetGame();
    popup.style.display = 'none';
});

window.addEventListener('keydown', e => {
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

// Start Game
function startStage() {
    correctLetters = [];
    wrongLetters = [];
    currentWordIndex = 0;
    selectedWord = getNextWord();
    displayHint();
    displayWord();
    updateWrongLetters();
    updateScoreBoard();
    startTimer();
}

startStage();*/

// Hangman Game Script Updated to Fix Timer Issue
//son bacak gelmiyor.
/*const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const timerEl = document.getElementById('timer');
const scoreBoardEl = document.createElement('div');
document.body.appendChild(scoreBoardEl);

// Game State Variables
let correctLetters = [];
let wrongLetters = [];
let currentStage = 1;
let currentWordIndex = 0;
let selectedWord = '';
let timer = null; // Ensure single timer instance
let timeLeft = 120; // 120 seconds per stage
let score = 0; // Starts from 0
const maxScore = 15; // Max score possible

scoreBoardEl.id = 'score-board';
scoreBoardEl.style.position = 'absolute';
scoreBoardEl.style.top = '10px';
scoreBoardEl.style.right = '10px';
scoreBoardEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreBoardEl.style.padding = '10px';
scoreBoardEl.style.borderRadius = '5px';
scoreBoardEl.style.color = 'white';

// Stages and Words
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
    stopTimer(); // Stop any previous timer
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

function displayHint() {
    const hintEl = document.createElement('div');
    hintEl.id = 'hint';
    hintEl.innerHTML = `<h3>${stages[currentStage - 1].hint}</h3>`;
    hintEl.style.position = 'absolute';
    hintEl.style.top = '50%';
    hintEl.style.left = '50%';
    hintEl.style.transform = 'translate(-50%, -50%)';
    hintEl.style.backgroundColor = '#222';
    hintEl.style.color = 'white';
    hintEl.style.padding = '20px';
    hintEl.style.border = '3px solid white';
    hintEl.style.borderRadius = '10px';
    hintEl.style.fontSize = '1.5rem';
    hintEl.style.textAlign = 'center';
    document.body.appendChild(hintEl);
    setTimeout(() => {
        document.body.removeChild(hintEl);
    }, 3000);
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
        score++; // Increment score for a correct word
        updateScoreBoard();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex === stages[currentStage - 1].words.length) {
                if (currentStage === stages.length) {
                    showFinalScore();
                } else {
                    alert('Stage completed! Moving to the next stage.');
                    currentStage++;
                    timeLeft = 120; // Reset timer for new stage
                    startStage();
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
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
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
        alert('The man is hanged! The game is over.');
        endGame();
    }
}

function endGame() {
    stopTimer();
    popup.style.display = 'flex';
    messageEl.innerHTML = `<h2>Game Over</h2><p>Your Final Score: ${score}/${maxScore}</p>`;
}

function resetGame() {
    stopTimer();
    correctLetters = [];
    wrongLetters = [];
    timeLeft = 120;
    score = 0; // Reset score for a new game
    currentStage = 1; // Reset to first stage
    startStage();
}

function showFinalScore() {
    popup.style.display = 'flex';
    messageEl.innerHTML = `
        <h2>Congratulations!</h2>
        <p>Your Final Score: ${score}/${maxScore}</p>
    `;
}

// Event Listeners
playAgainBtn.addEventListener('click', () => {
    resetGame();
    popup.style.display = 'none';
});

window.addEventListener('keydown', e => {
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

// Start Game
function startStage() {
    correctLetters = [];
    wrongLetters = [];
    currentWordIndex = 0;
    selectedWord = getNextWord();
    displayHint();
    displayWord();
    updateWrongLetters();
    updateScoreBoard();
    startTimer();
}

startStage();
*/

/*const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const timerEl = document.getElementById('timer');
const scoreBoardEl = document.createElement('div');
document.body.appendChild(scoreBoardEl);

// Game State Variables
let correctLetters = [];
let wrongLetters = [];
let currentStage = 1;
let currentWordIndex = 0;
let selectedWord = '';
let timer = null;
let timeLeft = 120;
let score = 0;
const maxScore = 15;

scoreBoardEl.id = 'score-board';
scoreBoardEl.style.position = 'absolute';
scoreBoardEl.style.top = '10px';
scoreBoardEl.style.right = '10px';
scoreBoardEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreBoardEl.style.padding = '10px';
scoreBoardEl.style.borderRadius = '5px';
scoreBoardEl.style.color = 'white';

// Stages and Words
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
                    alert('Stage completed! Moving to the next stage.');
                    currentStage++;
                    timeLeft = 120;
                    startStage();
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
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Burada son bacağın görünmesi durumunu kontrol edelim.
    if (wrongLetters.length === items.length) {
        // Son bacak çizgisinin görünmesi için belirli bir süre bekleyelim.
        setTimeout(() => {
            alert('The man is hanged! The game is over.');
            endGame();  // Oyunu bitir
        }, 500);  // Son bacak çizgisi görünene kadar 500ms bekleyin
    }
}


function endGame() {
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
    startStage();
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

function startStage() {
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

startStage();*/

// gameoverdansonra oyun devam ediyor. alert kaldırıdı
/*const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const timerEl = document.getElementById('timer');
const scoreBoardEl = document.createElement('div');
document.body.appendChild(scoreBoardEl);

// Game State Variables
let correctLetters = [];
let wrongLetters = [];
let currentStage = 1;
let currentWordIndex = 0;
let selectedWord = '';
let timer = null;
let timeLeft = 120;
let score = 0;
const maxScore = 15;

scoreBoardEl.id = 'score-board';
scoreBoardEl.style.position = 'absolute';
scoreBoardEl.style.top = '10px';
scoreBoardEl.style.right = '10px';
scoreBoardEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreBoardEl.style.padding = '10px';
scoreBoardEl.style.borderRadius = '5px';
scoreBoardEl.style.color = 'white';

// Stages and Words
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
                    alert('Stage completed! Moving to the next stage.');
                    currentStage++;
                    timeLeft = 120;
                    startStage();
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
        ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Burada son bacağın görünmesi durumunu kontrol edelim.
    if (wrongLetters.length === items.length) {
        // Son bacak çizgisinin görünmesi için belirli bir süre bekleyelim.
        setTimeout(() => {
            endGame();  // Oyunu bitir
        }, 500);  // Son bacak çizgisi görünene kadar 500ms bekleyin
    }
}

function endGame() {
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
    startStage();
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

function startStage() {
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
*/
const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const timerEl = document.getElementById('timer');
const scoreBoardEl = document.createElement('div');
document.body.appendChild(scoreBoardEl);

// Game State Variables
let correctLetters = [];
let wrongLetters = [];
let currentStage = 1;
let currentWordIndex = 0;
let selectedWord = '';
let timer = null;
let timeLeft = 120;
let score = 0;
const maxScore = 15;
let gameOver = false; // Flag to indicate if the game is over

scoreBoardEl.id = 'score-board';
scoreBoardEl.style.position = 'absolute';
scoreBoardEl.style.top = '10px';
scoreBoardEl.style.right = '10px';
scoreBoardEl.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
scoreBoardEl.style.padding = '10px';
scoreBoardEl.style.borderRadius = '5px';
scoreBoardEl.style.color = 'white';

// Stages and Words
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
                    alert('Stage completed! Moving to the next stage.');
                    currentStage++;
                    timeLeft = 120;
                    startStage();
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

    // Burada son bacağın görünmesi durumunu kontrol edelim.
    if (wrongLetters.length === items.length) {
        setTimeout(() => {
            endGame();  // Oyunu bitir
        }, 500);  // Son bacak çizgisi görünene kadar 500ms bekleyin
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
    gameOver = false; // Game is not over anymore
    startStage();
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
    if (gameOver) return; // If the game is over, no key presses will be accepted

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

function startStage() {
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




