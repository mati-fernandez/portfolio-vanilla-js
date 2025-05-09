//Guardar el elemento y el contexto
const mainCanvas = document.getElementById('main-canvas');
const context = mainCanvas.getContext('2d');

let initialX;
let initialY;

const dibujar = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(initialX, initialY);
  console.log(initialX, initialY);
  context.lineWidth = 3;
  context.strokeStyle = '#000';
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

const mouseDown = (e) => {
  initialX = e.offsetX;
  initialY = e.offsetY;
  dibujar(initialX, initialY);
  mainCanvas.addEventListener('mousemove', mouseMoving);
};

const mouseMoving = (e) => {
  dibujar(e.offsetX, e.offsetY);
};

const mouseUp = () => {
  mainCanvas.removeEventListener('mousemove', mouseMoving);
};

mainCanvas.addEventListener('mousedown', mouseDown);
mainCanvas.addEventListener('mouseup', mouseUp);
