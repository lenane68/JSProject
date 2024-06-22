const board = document.querySelector("#board");
const width = 30;
const height = 30;
let snake = [];
let border = [];
let divs = [];
let direction;
let appleIndex;

//🍎

function createBoard() {

    snake = [32, 31];
    divs = [];
    direction = 'left';
    appleIndex = 0;
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        if (i < (width + 1)) {
            border.push(i);
            div.classList.add('border');
        }
        else if (i % width === 0) {
            border.push(i);
            div.classList.add('border');
        }
        else if (i % width === (width - 1)) {
            border.push(i);
            div.classList.add('border');
        }
        else if (i > (width * height - width)) {
            border.push(i);
            div.classList.add('border');

        }
        //div.innerHTML = i;
        board.appendChild(div);
        divs.push(div);
    }
    color();
    addApple();
}

function color() {
    divs.forEach(div => {
        div.classList.remove("snake");
        div.innerHTML = '';
    })
    snake.forEach(x => {
        divs[x].classList.add("snake");
    })
    if (appleIndex) {
        divs[appleIndex].innerHTML = '🍎';
    }
    divs[snake[0]].innerHTML = '🐸';
    divs[snake[snake.length - 1]].innerHTML = '⚕';
}

function addApple() {
    console.log(snake);
    let apple = document.querySelector('.apple');
    if (apple) {
        apple.innerHTML = '';
        apple.classList.remove('apple');
        console.log(apple);
    }
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * divs.length); // Generate random index
    } while (snake.includes(randomIndex) || border.includes(randomIndex)); // Ensure the random index is not part of the snake
    console.log(randomIndex);
    divs[randomIndex].classList.add("apple");// Add "apple" class to the random div
    document.querySelector('.apple').innerHTML = '🍎';
    appleIndex = randomIndex;
}

function move(dir) {
    let head = snake[0];
    if (dir === 'up') {
        if (direction === 'down') {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        head -= width;
        if (head < 30) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (snake.includes(head)) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (head === appleIndex) {
            addApple();
            snake.push(snake[snake.length - 1] + width);
            console.log(snake);
        }
    }
    else if (dir === 'right') {
        if (direction === 'left') {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        head--;
        if (head % width === 0) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (snake.includes(head)) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (head === appleIndex) {
            addApple();
            snake.push(snake[snake.length - 1]);
        }

    } else if (dir === 'left') {
        if (direction === 'right') {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        head++;
        if (head % width === (width - 1)) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (snake.includes(head)) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (head === appleIndex) {
            addApple();
            snake.push(snake[snake.length - 1]);
        }

    } else if (dir === 'down') {
        if (direction === 'up') {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        head += width;
        if (head >= width * (height - 1)) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (snake.includes(head)) {
            showModal('Game Over!!!');
            resetGame();
            return;
        }
        if (head === appleIndex) {
            addApple();
            snake.push(snake[snake.length - 1] - width);
        }

    }

    direction = dir;
    snake.unshift(head);
    snake.pop();
    color();

}

window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case "ArrowUp": move("up"); break;
        case "ArrowRight": move("right"); break;
        case "ArrowDown": move("down"); break;
        case "ArrowLeft": move("left"); break;
    }
});
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
createBoard();

function resetGame() {
    createBoard();
}