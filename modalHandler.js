const scrollContainer = document.querySelector('#parallax-container');
const modalContainer = document.querySelector('#modal-bkg');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#modal-close-btn');
const title = document.querySelector('#modal-title');
const content = document.querySelector('#modal-content');

const handleClose = (fromNavigation) => {
  modalContainer.style.display = 'none';
  scrollContainer.style.pointerEvents = 'auto';
  document.removeEventListener('wheel', blockScroll);
  document.removeEventListener('touchmove', blockScroll);
  if (!fromNavigation) {
    history.back();
  }
};

function blockScroll(e) {
  e.preventDefault();
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    handleClose(false);
  }
});

closeBtn.addEventListener('click', () => handleClose(false));
modalContainer.addEventListener('click', () => handleClose(false));
modal.addEventListener('click', (e) => {
  e.stopPropagation();
});

window.addEventListener('popstate', (e) => {
  e.preventDefault();
  handleClose(true);
});

// Llamada a la función que abre el modal:
export const modalHandler = (id) => {
  history.pushState({ modalOpen: true }, '', window.location.href);
  scrollContainer.style.pointerEvents = 'none';
  modalContainer.style.pointerEvents = 'auto';
  const scrollY = scrollContainer.scrollTop;
  modalContainer.style.display = 'block';
  if (window.innerHeight < window.outerHeight) {
    // Si es desktop
    modal.style.top = `${scrollY + window.innerHeight / 2}px`;
  } else {
    // Si es mobile
    modal.style.top = `${scrollY + window.innerHeight / 2.2}px`;
  }
  content.textContent = window.appData[id].info.text;
  title.textContent = window.appData[id].info.title;
  document.addEventListener('wheel', blockScroll, { passive: false }); // Bloquea el scroll con la rueda del mouse
  document.addEventListener('touchmove', blockScroll, { passive: false }); // Bloquea el scroll en dispositivos táctiles
};
