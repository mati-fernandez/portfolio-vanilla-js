const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 27;

// 1. inicializar el canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const $score = document.querySelector('span');

let score = 0;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// 3. board
const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT);

function createBoard(width, height) {
  return Array(height)
    .fill()
    .map(() => Array(width).fill(0));
}

// 4. pieza player
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1],
  ],
};

//9. random pieces
const pieces = [
  [
    [1, 1],
    [1, 1],
  ],
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
];

// 2. game loop
// function update() {
//   draw();
//   window.requestAnimationFrame(update);
// }

// 8. auto drop
let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  // console.log(
  //   `deltaTime = ${deltaTime}time = ${time} lastTime=${lastTime} dropCounter = ${dropCounter}`
  // );
  draw();
  window.requestAnimationFrame(update);
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = 'yellow';
        context.fillRect(x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = 'red';
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });
  $score.innerText = score;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }
  if (e.key === 'ArrowRight') {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }
  if (e.key === 'ArrowDown') {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  if (e.key === 'ArrowUp') {
    const rotated = [];

    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = [];

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i]);
      }

      rotated.push(row);
    }

    const previousShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision()) {
      piece.shape = previousShape;
    }
  }
});

function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    });
  });

  //reset position
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
  piece.position.y = 0;
  //get random shape
  piece.shape = pieces[Math.floor(Math.random() * pieces.length)];
  //gameover
  if (checkCollision()) {
    window.alert(`Game over!! Sorry!... Your Score: ${score}`);
    score = 0;
    board.forEach((row) => row.fill(0));
  }
}

function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach((y) => {
    board.splice(y, 1);
    const newRow = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRow);
    score += 10;
  });
}

const $section = document.querySelector('section');

const $audioBtn = document.querySelector('#aduioBtn');

const $audioToggleBtn = document.querySelector('#audio-toggle'),
  audioOn = 'Music: 🔊',
  audioOff = 'Music: 🔇',
  audio = new Audio('./assets/tetris.mp3');
audio.volume = 0.1;

document.addEventListener('click', (e) => {
  if (e.target.matches('#audio-toggle')) {
    if ($audioToggleBtn.textContent === audioOff) {
      $audioToggleBtn.textContent = audioOn;
      audio.play();
    } else {
      $audioToggleBtn.textContent = audioOff;
      audio.pause();
    }
  }
  if (e.target.matches('section')) {
    update();
    $section.remove();
  }
});

/*********************** MOBILE ***************************/

// Variables para el control de movimiento continuo
let intervalId;

document.addEventListener('click', (e) => {
  if (e.target.matches('#arriba')) {
    rotatePiece();
  }
  if (e.target.matches('#izquierda')) {
    moveLeft();
  }
  if (e.target.matches('#derecha')) {
    moveRight();
  }
  if (e.target.matches('#abajo')) {
    moveDown();
  }
});

document.addEventListener(
  'touchstart',
  (e) => {
    if (e.target.matches('#izquierda')) {
      intervalId = setInterval(moveLeft, 150); // Mover hacia la izquierda continuamente
    }
    if (e.target.matches('#derecha')) {
      intervalId = setInterval(moveRight, 150); // Mover hacia la derecha continuamente
    }
    if (e.target.matches('#abajo')) {
      intervalId = setInterval(moveDown, 150); // Mover hacia abajo continuamente
    }
  },
  { passive: true }
);

document.addEventListener('touchend', () => {
  clearInterval(intervalId); // Detener el movimiento continuo al soltar el toque
});

document.addEventListener('touchcancel', () => {
  clearInterval(intervalId); // Detener el movimiento continuo si el toque es cancelado
});

// Funciones para mover la pieza
function moveLeft() {
  piece.position.x--;
  if (checkCollision()) {
    piece.position.x++;
  }
}

function moveRight() {
  piece.position.x++;
  if (checkCollision()) {
    piece.position.x--;
  }
}

function moveDown() {
  piece.position.y++;
  if (checkCollision()) {
    piece.position.y--;
    solidifyPiece();
    removeRows();
  }
}

function rotatePiece() {
  const rotated = [];
  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = [];
    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i]);
    }
    rotated.push(row);
  }
  const previousShape = piece.shape;
  piece.shape = rotated;
  if (checkCollision()) {
    piece.shape = previousShape;
  }
}
