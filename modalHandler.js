const scrollContainer = document.querySelector('#parallax-container');
const modalContainer = document.querySelector('#modal-bkg');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#modal-close-btn');
const title = document.querySelector('#modal-title');
const content = document.querySelector('#modal-content');

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    handleClose();
  }
});

const handleClose = () => {
  modalContainer.style.display = 'none';
  scrollContainer.style.pointerEvents = 'auto';
  document.removeEventListener('wheel', blockScroll);
  document.removeEventListener('touchmove', blockScroll);
};

function blockScroll(e) {
  e.preventDefault();
}

closeBtn.addEventListener('click', handleClose);
modalContainer.addEventListener('click', handleClose);
modal.addEventListener('click', (e) => {
  e.stopPropagation();
});
window.addEventListener('popstate', (e) => {
  e.preventDefault();
  handleClose();
});

export const modalHandler = (id) => {
  history.pushState({ modalOpen: true }, '', window.location.href);
  scrollContainer.style.pointerEvents = 'none';
  modalContainer.style.pointerEvents = 'auto';
  const scrollY = scrollContainer.scrollTop;
  modalContainer.style.display = 'block';
  modal.style.top = `${scrollY + window.innerHeight / 2}px`;
  content.textContent = window.appData[id].info.text;
  title.textContent = window.appData[id].info.title;
  document.addEventListener('wheel', blockScroll, { passive: false }); // Bloquea el scroll con la rueda del mouse
  document.addEventListener('touchmove', blockScroll, { passive: false }); // Bloquea el scroll en dispositivos táctiles
};
