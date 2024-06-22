//🕷
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isFaceUp = false;
        this.canDrag = false;
    }

    flip() {
        this.isFaceUp = true;
        this.canDrag = true;
    }

    changeDrag() {
        this.canDrag = !this.canDrag;
    }

    render() {
        return this.isFaceUp ? `${this.value}  ${this.suit}` : 'Card';
    }


}

class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    initializeDeck() {
        const suits = ['♥', '♦', '♣', '♠'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value));
            }
        }

        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return this.cards.pop();
    }
}

class Board {
    constructor() {
        this.columns = [[], [], [], [], [], [], []];
        this.cards1 = [];
        this.cards2 = [];
        this.cards3 = [];
        this.cards4 = [];
    }

    render() {
        let boardHTML = '';
        for (let i = 0; i < this.columns.length; i++) {
            boardHTML += `<div class="column" id="column-${i}">`;
            const column = this.columns[i];
            for (let j = 0; j < column.length; j++) {
                const card = column[j];
                boardHTML += `<div class="card ${card.isFaceUp ? 'face-up' : ''} ${card.suit} ${card.canDrag ? 'drag' : ''}" 
                id="c-${i}-r-${j}">${card.render()}</div>`;
            }
            boardHTML += '</div>';
        }
        document.getElementById('board').innerHTML = `<div class="columns-container">${boardHTML}</div>`;
        allowDrag();
    }

    isValidMove(card, column) {
        console.log(column);
        if (column > 8) {
            let topCard = 0;
            let pileLength = 0;
            if (column === 9) {
                pileLength = this.cards1.length;
                topCard = this.cards1[0];
            }
            else if (column === 10) {
                pileLength = this.cards2.length;
                topCard = this.cards2[0];
            }
            else if (column === 11) {
                pileLength = this.cards3.length;
                topCard = this.cards3[0];
            }
            else {
                pileLength = this.cards4.length;
                topCard = this.cards4[0];
            }
            console.log(pileLength);
            if (pileLength === 0) {
                return card.value === 'A';
            }
            else {
                if (topCard !== 0) {
                    console.log(this.isHigherByOne(card, topCard));
                    console.log(card.suit === topCard.suit);
                    return this.isHigherByOne(card, topCard) && card.suit === topCard.suit;
                }
            }
        }
        else {
            const columnLength = this.columns[column].length;
            if (columnLength === 0) {
                return card.value === 'K'; // Only kings can be placed on empty columns
            } else {
                const topCard = this.columns[column][0];
                return this.isOppositeColor(card, topCard) && this.isLowerByOne(card, topCard);
            }
        }

    }

    isOppositeColor(card1, card2) {
        const redSuits = ['♥', '♦'];
        return (redSuits.includes(card1.suit) && !redSuits.includes(card2.suit)) ||
            (!redSuits.includes(card1.suit) && redSuits.includes(card2.suit));
    }

    isLowerByOne(card1, card2) {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return values.indexOf(card1.value) === values.indexOf(card2.value) - 1;
    }

    isHigherByOne(card1, card2) {
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return values.indexOf(card1.value) === values.indexOf(card2.value) + 1;
    }

    moveCard(cards, column) {
        cards = cards.reverse();
        if (column > 8) {
            for (let c of cards) {
                switch (column) {
                    case 9:
                        this.cards1.unshift(c);
                        document.getElementById(`p-9`).innerHTML = `<div class="card face-up ${c.suit}" > ${c.render()}</div > `;
                        break;
                    case 10:
                        this.cards2.unshift(c);
                        document.getElementById(`p-10`).innerHTML = `<div class="card face-up ${c.suit}" > ${c.render()}</div > `;
                        break;
                    case 11:
                        this.cards3.unshift(c);
                        document.getElementById(`p-11`).innerHTML = `<div class="card face-up ${c.suit}" > ${c.render()}</div > `;
                        break;
                    case 12: this.cards4.unshift(c);
                        document.getElementById(`p-12`).innerHTML = `<div class="card face-up ${c.suit}" > ${c.render()}</div > `;
                        break;
                }
            }
        }
        else {
            for (let c of cards) {
                this.columns[column].unshift(c);
            }
        }
        if (game.pile.cardsPile.length === 0 && game.pile.flippedCards.length === 0) {
            document.getElementById('ce').style.backgroundColor = 'purple';
            document.getElementById('ce').textContent = 'Empty!';
        }

        if (this.cards1.length === 13) {
            if (this.cards2.length === 13) {
                if (this.cards3.length === 13) {
                    if (this.cards4.length === 13) {
                        showModal('You Win!!!!');
                    }
                }
            }
        }
        this.render();
    }
}

class Pile {
    constructor() {
        this.cardsPile = [];
        this.flippedCards = [];
    }

    render() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card-pile');
        cardElement.id = 'ce'
        cardElement.textContent = 'Card';
        cardElement.addEventListener('click', this.openCard.bind(this));
        document.getElementById('pile').appendChild(cardElement);

        for (let i = 9; i < 13; i++) {
            let c = document.createElement('div');
            c.classList.add('card-pile', 'soliPile');
            c.id = `p-${i}`;
            c.textContent = '🕷';
            document.getElementById('pile').appendChild(c);
        }
        allowDrag();
    }
    openCard() {
        if (this.cardsPile.length === 0 && this.flippedCards.length === 0) {
            return;
        }
        if (this.cardsPile.length === 0) {
            while (this.flippedCards.length > 0) {
                this.cardsPile.push(this.flippedCards.pop());
            }
            console.log(this.cardsPile);
            this.renderFlippedCards();
            document.getElementById('ce').style.backgroundColor = 'red';
            document.getElementById('ce').textContent = 'Card';
            return;
        }
        let flipPileCard = this.cardsPile.pop();
        flipPileCard.flip();
        this.flippedCards.push(flipPileCard);
        this.renderFlippedCards();
        if (this.cardsPile.length === 0) {
            document.getElementById('ce').style.backgroundColor = 'Yellow';
            document.getElementById('ce').textContent = '⟳';
        }
        /*if (this.cardsPile.length === 0 && this.flippedCards.length === 0){
            document.getElementById('ce').style.backgroundColor = 'purble';
            document.getElementById('ce').textContent = 'Empty!';
        }*/


    }
    renderFlippedCards() {
        const pileElement = document.getElementById('flipPile');
        pileElement.innerHTML = ''; // Clear existing content

        let boardHTML = '<div class="columns-container">';
        for (let j = 0; j < this.flippedCards.length; j++) {
            const card = this.flippedCards[j];
            if (j !== this.flippedCards.length - 1) {
                card.canDrag = false;
            }
            else {
                card.canDrag = true;
            }
            const cardClass = `card flipCard ${card.isFaceUp ? 'face-up' : ''} ${card.suit} ${card.canDrag ? 'drag' : ''}`;
            const cardContent = card.render(); // Assuming render() returns the card's display text

            // Calculate position based on index j
            const topPosition = j * 0.5; // Adjust the spacing between stacked cards

            // Use inline styles for absolute positioning
            boardHTML += `<div id="c-${8}-r-${j}" class="${cardClass}" style=" top: ${topPosition}vh; ">${cardContent}</div>`;
        }
        boardHTML += '</div>';

        pileElement.innerHTML = boardHTML;
        allowDrag();
    }


}

class Game {
    constructor() {
        this.deck = new Deck();
        this.board = new Board();
        this.pile = new Pile();
    }

    start() {
        this.deck.shuffle();
        this.initializeBoard();
        this.initializePile();
    }

    initializeBoard() {
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j <= i; j++) {
                const card = this.deck.deal();
                if (j === i) {
                    card.flip();
                }
                this.board.columns[j].push(card);
            }
        }
    }
    initializePile() {
        while (this.deck.cards.length > 0) {
            const card = this.deck.deal();
            this.pile.cardsPile.push(card);
        }

        this.pile.render();

    }

    makeMove(cardIndex, fromColumn, toColumn) {

        if (fromColumn === 8) {
            const card = this.pile.flippedCards[cardIndex];

            if (!card.isFaceUp) {
                console.log('Cannot move face-down cards.');
                return;
            }
            if (!this.board.isValidMove(card, toColumn)) {
                console.log('Invalid move.');
                return;
            }
            console.log('you are here');
            const movedCards = this.pile.flippedCards.splice(cardIndex, 1);
            console.log(movedCards);
            this.board.moveCard(movedCards, toColumn);
            this.pile.renderFlippedCards();

        }
        else {
            const card = this.board.columns[fromColumn][cardIndex];

            if (!card.isFaceUp) {
                console.log('Cannot move face-down cards.');
                return;
            }
            if (!this.board.isValidMove(card, toColumn)) {
                console.log('Invalid move.');
                return;
            }
            if (toColumn < 8) {
                const movedCards = this.board.columns[fromColumn].splice(0, cardIndex + 1);
                console.log(cardIndex);
                if (this.board.columns[fromColumn].length > 0) {
                    this.board.columns[fromColumn][0].flip();
                }
                this.board.moveCard(movedCards, toColumn);
            }
            else {
                if (cardIndex !== 0) {
                    console.log('cant move more than 1');
                    return;
                }
                else {
                    const movedCard = this.board.columns[fromColumn].splice(0, 1);
                    if (this.board.columns[fromColumn].length > 0) {
                        this.board.columns[fromColumn][0].flip();
                    }
                    this.board.moveCard(movedCard, toColumn);
                }
            }
        }
    }
}

// Usage example
let game = new Game();
game.start();
game.board.render();

function resetGame() {
    document.getElementById('pile').innerHTML = '';
    document.getElementById('flipPile').innerHTML = '';
    game = new Game();
    game.start();
    game.board.render();
}

function allowDrag() {

    document.querySelectorAll('.column').forEach(function (column) {
        column.addEventListener("dragover", allowDrop);
        column.addEventListener("drop", drop);
    });

    document.querySelectorAll('.soliPile').forEach(function (pile) {
        console.log(pile);
        pile.addEventListener("dragover", allowDrop);
        pile.addEventListener("drop", drop);
    });

    cards = document.querySelectorAll('.card.drag');

    cards.forEach(card => {
        card.setAttribute('draggable', true);// Enable dragging for the card
        card.addEventListener('dragstart', dragStart);
    });
}
// Function to handle drag start event
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Function to handle drag over event
function allowDrop(event) {
    event.preventDefault();
}

// Function to handle drop event
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var draggedItem = document.getElementById(data);
    var cardColumn = parseInt(draggedItem.id.split("-")[1]);
    var cardNum = parseInt(draggedItem.id.split("-")[3]);
    var columnTarget = parseInt(this.id.split("-")[1]);
    game.makeMove(cardNum, cardColumn, columnTarget);
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