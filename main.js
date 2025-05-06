const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const setupButton = document.querySelector('.setup');
const inputField = document.querySelector('input');

let score = 0;
let circles = [];
let currentTarget = 1;

function createTarget(number) {
    const circle = document.createElement('div');
    circle.textContent = number;
    circle.classList.add('game-circle');
    Object.assign(circle.style, {
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundColor: 'red',
        borderRadius: '50%',
        cursor: number === 1 ? 'pointer' : 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: '#fff',
    });

    circle.dataset.number = number;

    circle.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        const num = parseInt(circle.dataset.number, 10);
        if (num === currentTarget) {
            circle.remove();
            currentTarget++;
            enableNextCircle();
            scoreBoard.textContent = `Score: ${score}`;
        }
    });

    gameArea.appendChild(circle);
    moveTarget(circle);
    circles.push(circle);
}

function enableNextCircle() {
    const next = circles.find(c => parseInt(c.dataset.number, 10) === currentTarget);
    if (next) {
        next.style.cursor = 'pointer';
    } else if (currentTarget > circles.length) {
        score++;
        setTimeout(() => resetGame(), 100);
    }
}

function moveTarget(circle) {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const maxX = gameAreaRect.width - 50;
    const maxY = gameAreaRect.height - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
}

function resetGame() {
    circles.forEach(c => c.remove());
    circles = [];
    currentTarget = 1;

    const numberOfCircles = Math.min(5, Math.max(1, parseInt(inputField.value, 10) || 5));
    
    for (let i = 1; i <= numberOfCircles; i++) {
      createTarget(i);
    }
}

setupButton.addEventListener('click', function (e) {
    e.preventDefault();
    resetGame();
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault();
        score = 0;
        currentTarget = 1;
        scoreBoard.textContent = `Score: ${score}`;
    }
});
