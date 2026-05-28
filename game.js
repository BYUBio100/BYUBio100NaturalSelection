const colors = ['red', 'pink', 'orange', 'yellow', 'green', 'navy', 'purple', 'cyan', 'black', 'white'];
let board = [];
let round = 1;
const maxRounds = 3;
let consumedCount = 0;

// Set background color with pattern overlay
document.getElementById('setBackground').onclick = function() {
    let selectedColor = document.getElementById('backgroundSelect').value;
    let gameBoard = document.getElementById('gameBoard');
    gameBoard.style.backgroundColor = selectedColor;
    gameBoard.style.backgroundImage = "url('pattern.png')"; // Twisting black pattern overlay
    gameBoard.style.backgroundSize = "100px 100px";
    gameBoard.style.backgroundRepeat = "repeat";
};

// Create a game board
function generateBoard() {
    board = [];
    round = 1;
    consumedCount = 0;
    document.getElementById('gameBoard').innerHTML = '';
    document.getElementById('consumedCounter').innerText = 'Consumed: 0';
    
    for (let i = 0; i < 100; i++) {
        let color = colors[Math.floor(i / 10)];
        let dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.backgroundColor = color;
        dot.style.top = `${Math.random() * 90}%`;
        dot.style.left = `${Math.random() * 90}%`;
        dot.onclick = () => consumeDot(dot, color);
        document.getElementById('gameBoard').appendChild(dot);
        board.push({ color, element: dot });
    }
    updateStats();
}

// Remove dots on click
function consumeDot(dot, color) {
    dot.style.display = 'none';
    board = board.filter(d => d.element !== dot);
    consumedCount++;
    document.getElementById('consumedCounter').innerText = `Consumed: ${consumedCount}`;
    updateStats();
}

// Track surviving population
function updateStats() {
    let stats = {};
    colors.forEach(color => stats[color] = 0);
    board.forEach(dot => stats[dot.color]++);

    let statsTable = document.getElementById('stats');
    statsTable.innerHTML = '';
    Object.keys(stats).forEach(color => {
        let row = document.createElement('tr');
        row.innerHTML = `<td>${color}</td><td>${stats[color]}</td>`;
        statsTable.appendChild(row);
    });
}

// Reproduction function
function reproduce() {
    if (round > maxRounds) {
        alert('Game Over! Refresh to play again.');
        return;
    }

    let newDots = [];
    board.forEach(dot => {
        for (let i = 0; i < 3; i++) {
            let clone = document.createElement('div');
            clone.className = 'dot';
            clone.style.backgroundColor = dot.color;
            clone.style.top = `${Math.random() * 90}%`;
            clone.style.left = `${Math.random() * 90}%`;
            clone.onclick = () => consumeDot(clone, dot.color);
            document.getElementById('gameBoard').appendChild(clone);
            newDots.push({ color: dot.color, element: clone });
        }
    });

    board.push(...newDots);
    round++;
    consumedCount = 0;
    document.getElementById('consumedCounter').innerText = 'Consumed: 0';
    updateStats();

    if (round > maxRounds) {
        alert('Final reproduction complete! Simulation is over.');
    }
}

document.getElementById('startGame').onclick = generateBoard;
document.getElementById('nextRound').onclick = reproduce;
