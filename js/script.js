// Elementos
const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const difficultySel = document.getElementById('difficulty');
const holesCountSel = document.getElementById('holesCount');

// Estado do jogo
let score = 0;
let timeLeft = 30;
let gameInterval = null;
let moleTimeout = null;
let activeHole = null;
let running = false;

// Configuração por dificuldade
const difficultySettings = {
    easy: {
        minUp: 900,
        maxUp: 1400
    },
    normal: {
        minUp: 600,
        maxUp: 1000
    },
    hard: {
        minUp: 350,
        maxUp: 700
    }
};

// ===============================
// Sons (Web Audio API)
// ===============================

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {

    // Alguns navegadores suspendem o contexto até uma interação do usuário
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {

        // Acertou a toupeira
        case "hit":

            oscillator.type = "square";

            oscillator.frequency.setValueAtTime(
                650,
                audioContext.currentTime
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                900,
                audioContext.currentTime + 0.08
            );

            gainNode.gain.setValueAtTime(
                0.20,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.10
            );

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.10);

            break;

        // Início do jogo
        case "start":

            oscillator.type = "triangle";

            oscillator.frequency.setValueAtTime(
                350,
                audioContext.currentTime
            );

            oscillator.frequency.linearRampToValueAtTime(
                700,
                audioContext.currentTime + 0.25
            );

            gainNode.gain.setValueAtTime(
                0.25,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.30
            );

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.30);

            break;

        // Fim do jogo
        case "end":

            oscillator.type = "sawtooth";

            oscillator.frequency.setValueAtTime(
                700,
                audioContext.currentTime
            );

            oscillator.frequency.linearRampToValueAtTime(
                180,
                audioContext.currentTime + 0.45
            );

            gainNode.gain.setValueAtTime(
                0.25,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.45
            );

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.45);

            break;
    }
}

// Cria os buracos
function createBoard(count) {

    boardEl.innerHTML = '';

    for (let i = 0; i < count; i++) {

        const hole = document.createElement('div');
        hole.className = 'hole';
        hole.dataset.index = i;
        hole.setAttribute('role', 'button');
        hole.setAttribute('aria-label', `Buraco ${i + 1}`);

        const mole = document.createElement('div');
        mole.className = 'mole';

        hole.appendChild(mole);
        boardEl.appendChild(hole);

        hole.addEventListener('click', hit);
        hole.addEventListener('touchstart', hit, {
            passive: true
        });

    }

}

// Escolhe um buraco aleatório
function randomHole() {

    const holes = Array.from(boardEl.children);

    if (holes.length === 0) {
        return null;
    }

    let idx;

    do {

        idx = Math.floor(Math.random() * holes.length);

    } while (
        activeHole &&
        idx === Number(activeHole.dataset.index) &&
        holes.length > 1
    );

    return holes[idx];

}

// Mostra a toupeira
function showMole() {

    const settings = difficultySettings[difficultySel.value];

    const upTime =
        Math.floor(
            Math.random() *
            (settings.maxUp - settings.minUp + 1)
        ) + settings.minUp;

    const hole = randomHole();

    if (!hole) {
        return;
    }

    const mole = hole.querySelector('.mole');

    activeHole = hole;

    mole.classList.add('up');

    moleTimeout = setTimeout(() => {

        mole.classList.remove('up');
        activeHole = null;

        if (running) {

            setTimeout(showMole, 200);

        }

    }, upTime);

}

// Acertou a toupeira
function hit(e) {

    if (!running) {
        return;
    }

    const hole = e.currentTarget;
    const mole = hole.querySelector('.mole');

    if (!mole.classList.contains('up')) {
        return;
    }

    score++;
    scoreEl.textContent = score;

    playSound("hit");

    mole.classList.remove('up');
    mole.style.transform = 'translateY(10%) scale(0.9)';

    setTimeout(() => {

        mole.style.transform = '';

    }, 150);

    clearTimeout(moleTimeout);

    activeHole = null;

    setTimeout(showMole, 150);

}

// Inicia o jogo
function startGame() {

    if (running) {
        return;
    }

    score = 0;
    timeLeft = 30;

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;

    running = true;

    playSound("start");

    startBtn.textContent = 'Em Jogo';
    startBtn.disabled = true;

    createBoard(Number(holesCountSel.value));

    showMole();

    gameInterval = setInterval(() => {

        timeLeft--;

        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {

            endGame();

        }

    }, 1000);

}

// Finaliza o jogo
function endGame() {

    running = false;

    playSound("end");

    startBtn.textContent = 'Iniciar';
    startBtn.disabled = false;

    clearInterval(gameInterval);
    clearTimeout(moleTimeout);

    const moles = boardEl.querySelectorAll('.mole.up');

    moles.forEach((mole) => {

        mole.classList.remove('up');

    });

    activeHole = null;

    setTimeout(() => {

        alert('Fim de jogo! Sua pontuação: ' + score);

    }, 100);

}

// Inicialização
(function init() {

    createBoard(Number(holesCountSel.value));

    startBtn.addEventListener('click', startGame);

    difficultySel.addEventListener('change', () => {
        // Mantido para futuras alterações de dificuldade em tempo real.
    });

    holesCountSel.addEventListener('change', () => {

        if (!running) {

            createBoard(Number(holesCountSel.value));

        }

    });

    boardEl.addEventListener('keydown', (e) => {

        if (e.key === 'Enter' || e.key === ' ') {

            e.preventDefault();
            e.target.click();

        }

    });

})();