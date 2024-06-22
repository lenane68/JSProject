const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍒', '🍓', '🍍', '🍌', '🍐', '🍑', '🍈', '🥝', '🥥', '🥭', '🍎', '🍊', '🍋', '🍉', '🍇', '🍒', '🍓', '🍍', '🍌', '🍐', '🍑', '🍈', '🥝', '🥥', '🥭'];
let cards = [];
let flippedCards = [];
let matchedCards = [];

function createGameBoard() {
    let gameBoard = document.querySelector('.game-board');
    symbols.forEach(symbol => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<span class="symbol">${symbol}</span>`;
        card.addEventListener('click', () => flipCard(card));
        cards.push(card);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.querySelector('.symbol').textContent;
    const symbol2 = card2.querySelector('.symbol').textContent;

    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === symbols.length) {
            showModal('Congratulations! You won the game!');
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];

}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    matchedCards = [];
    flippedCards = [];
    setTimeout(() => {
        shuffleCards();
    }, 200);
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
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

// Initialize the game
createGameBoard();
shuffleCards();
