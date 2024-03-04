document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    const moveCounter = document.getElementById('moveCounter');
    let size = 5; // Add this line to define the size variable
    let moves = 0;

    function createBoard() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const square = document.createElement('div');
                square.id = `square-${i * size + j}`;
                square.classList.add('square');
                square.addEventListener('click', () => toggleLights(square, i, j));
                board.appendChild(square);
            }
        }
        randomizeLights();
    }

    function toggleLights(clickedSquare, row, col) {
        clickedSquare.classList.toggle('is-off');

        const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dx, dy] of neighbors) {
            const newRow = row + dx;
            const newCol = col + dy;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                const neighbor = document.getElementById(`square-${newRow * size + newCol}`);
                if (neighbor) {
                    neighbor.classList.toggle('is-off');
                }
            }
        }

        checkWin();
        updateMoveCounter(); // New: Update move counter
    }

    function checkWin() {
        const offSquares = document.querySelectorAll('.is-off');
        if (offSquares.length === size * size) {
            window.alert('You win!');
            randomizeLights();
            resetMoveCounter(); // New: Reset move counter on win
        }
    }

    function randomizeLights() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            if (Math.random() < 0.5) {
                square.classList.add('is-off');
            } else {
                square.classList.remove('is-off');
            }
        });
        resetMoveCounter(); // New: Reset move counter on new game
    }

    function resetMoveCounter() {
        moves = 0;
        updateMoveCounter();
    }

    function updateMoveCounter() {
        moves++;
        moveCounter.textContent = `Moves: ${moves}`;
    }

    resetButton.addEventListener('click', function () {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('is-off');
        });
        randomizeLights();
        resetMoveCounter(); // New: Reset move counter on reset
    });

    createBoard();
});