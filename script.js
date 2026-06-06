
const sampleQuotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect. Keep pushing your limits every single day.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Beautiful is better than ugly. Explicit is better than implicit.",
    "Web development with HTML, CSS, and JavaScript is interactive and fun."
];

const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');

let timeElapsed = 0;
let timerInterval = null;
let isPlaying = false;
let currentQuote = "";


function renderNewQuote() {

    const randomIndex = Math.floor(Math.random() * sampleQuotes.length);
    currentQuote = sampleQuotes[randomIndex];
    
    quoteDisplay.innerHTML = '';
    

    currentQuote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplay.appendChild(charSpan);
    });
    
    quoteInput.value = '';
}


function startTimer() {
    timeElapsed = 0;
    timerElement.innerText = timeElapsed;
    
    timerInterval = setInterval(() => {
        timeElapsed++;
        timerElement.innerText = timeElapsed;
        calculateWPM();
    }, 1000);
}


function calculateWPM() {
    if (timeElapsed === 0) return;
    
    const typedWords = quoteInput.value.length / 5; 
    const wpm = Math.round((typedWords / timeElapsed) * 60);
    wpmElement.innerText = wpm;
}


quoteInput.addEventListener('input', () => {
   
    if (!isPlaying) {
        isPlaying = true;
        startTimer();
    }

    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');
    
    let correctCount = 0;
    let finished = true;

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        
        if (character == null) {
         
            characterSpan.className = '';
            finished = false;
        } else if (character === characterSpan.innerText) {
        
            characterSpan.className = 'char-correct';
            correctCount++;
        } else {
   
            characterSpan.className = 'char-incorrect';
        }
    });


    if (arrayValue.length > 0) {
        const accuracy = Math.round((correctCount / arrayValue.length) * 100);
        accuracyElement.innerText = `${accuracy}%`;
    } else {
        accuracyElement.innerText = '100%';
    }

  
    if (finished && correctCount === arrayQuote.length) {
        clearInterval(timerInterval);
        quoteInput.disabled = true; 
        alert(`게임 종료! 최종 타수: ${wpmElement.innerText} WPM`);
    }
});


function resetGame() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPlaying = false;
    timeElapsed = 0;
    
    timerElement.innerText = '0';
    wpmElement.innerText = '0';
    accuracyElement.innerText = '100%';
    quoteInput.disabled = false;
    
    renderNewQuote();
    quoteInput.focus();
}

restartBtn.addEventListener('click', resetGame);


renderNewQuote();