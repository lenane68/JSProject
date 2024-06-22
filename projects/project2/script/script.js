
const board = document.querySelector('.board');

//starts with X
let currentPlayer = 'X';

//board cells
let cells = [];

// check winner function
function checkWinner() {

    //winner who gets one of this - rows + columns + diagonal
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //check if in one of the winning combinations cells contains same on all cells (X OR O) and alert if there is a match
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return combination;
        }
    }

    //if no cell empty and no one win there is a draw!
    if (!cells.includes('')) {
        showModal("It's a draw!");
    }

    return null;
}


//reset cells to empty
function resetGame() {
    cells = Array(9).fill('');
    currentPlayer = 'X';
    render();
}

//handle cell click if the cell is empty write the cell value x or o and then change the player
function handleClick(index) {
    if (cells[index] === '') {
        cells[index] = currentPlayer;
        //change the player from x to o and from o to x 
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        //update html display
        render();

        //after adding x or o to the board check if someone wins
        const winner = checkWinner();
        if (winner) {
            highlightWinningCells(winner);
            showModal(`${cells[winner[0]]} wins!`);
        }
    }
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(cellIndex => {
        const cell = board.querySelector(`.cell[data-index="${cellIndex}"]`);
        cell.classList.add('winning-cell');
    });
}


//updating the HTML display of the game board based on the current state of the game stored in the cells array. 
function render() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', index);
        cell.textContent = value;
        cell.addEventListener('click', () => handleClick(index));
        board.appendChild(cell);
    });
}

function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

resetGame();