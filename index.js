import { loadResources } from './helpers/loadResources.js';

let mobileVersionMaxAspectRatio = 0.8;
window.mobileVersion =
  window.innerWidth / window.innerHeight < mobileVersionMaxAspectRatio
    ? true
    : false;
//Establecer todo el js después de la carga del dom:
document.addEventListener('DOMContentLoaded', (e) => {
  //Variables y constantes de uso global:
  const devMode =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.hostname.includes('192.168');
  console.log('Modo desarrollo:', devMode);

  // Actualiza el modo actual del viewport
  const updateViewportMode = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    if (
      e.target.innerWidth / e.target.innerHeight <
      mobileVersionMaxAspectRatio
    ) {
      window.mobileVersion = true;
      console.log('Mobile view', mobileVersion);
    } else if (
      e.target.innerWidth / e.target.innerHeight <=
        mobileVersionMaxAspectRatio &&
      mobileVersion
    ) {
      window.mobileVersion = false;
      console.log('Mobile view', mobileVersion);
    }
  };

  // Carga de recursos
  loadResources();

  // Selectores
  const $scrollToBottom = document.querySelector('#scroll-to-bottom');
  const content = document.getElementById('content');
  const parallaxBackground = document.getElementById('parallax-background');
  const $devModeBtn = document.querySelector('#dev-mode-btn');

  // Estilos condicionados
  devMode === true
    ? ($devModeBtn.style.display = 'block')
    : ($devModeBtn.style.display = 'none');

  // View more
  const $viewMoreProjects = document.querySelector('#view-more-projects');
  const $viewLessProjects = document.querySelector('#view-less-projects');
  const $viewMoreOdysseys = document.querySelector('#view-more-odysseys');
  const $viewLessOdysseys = document.querySelector('#view-less-odysseys');
  const $viewMoreCert = document.querySelector('#view-more-cert');
  const $viewLessCert = document.querySelector('#view-less-cert');

  $viewMoreProjects.addEventListener('click', () => {
    $viewMoreProjects.style.display = 'none';
    $viewLessProjects.style.display = 'inline-block';
    window.$secondaryProjects.forEach((card) => (card.style.display = 'flex'));
  });
  $viewLessProjects.addEventListener('click', () => {
    $viewMoreProjects.style.display = 'inline-block';
    $viewLessProjects.style.display = 'none';
    window.$secondaryProjects.forEach((card) => (card.style.display = 'none'));
  });

  $viewMoreOdysseys.addEventListener('click', () => {
    $viewMoreOdysseys.style.display = 'none';
    $viewLessOdysseys.style.display = 'inline-block';
    window.$secondaryOdysseys.forEach((card) => (card.style.display = 'flex'));
  });
  $viewLessOdysseys.addEventListener('click', () => {
    $viewMoreOdysseys.style.display = 'inline-block';
    $viewLessOdysseys.style.display = 'none';
    window.$secondaryOdysseys.forEach((card) => (card.style.display = 'none'));
  });

  $viewMoreCert.addEventListener('click', () => {
    $viewMoreCert.style.display = 'none';
    $viewLessCert.style.display = 'inline-block';
    window.$secondaryCerts.forEach((card) => (card.style.display = 'flex'));
  });

  $viewLessCert.addEventListener('click', () => {
    $viewMoreCert.style.display = 'inline-block';
    $viewLessCert.style.display = 'none';
    window.$secondaryCerts.forEach((card) => (card.style.display = 'none'));
  });

  // Efecto "Burbujas en el agua"
  const shapes = document.querySelectorAll('.shape');
  // Configura las propiedades iniciales de las formas
  shapes.forEach((shape, index) => {
    shape.style.width = `${50 + Math.random() * 100}px`; // Tamaños aleatorios
    shape.style.height = shape.style.width;
    // Posición inicial dentro del rango visible
    const top = 27 + Math.random() * 50;
    const left = 10 + Math.random() * 65;
    shape.style.top = `${top}%`;
    shape.style.left = `${left}%`;
    // Añadir un retraso aleatorio para el movimiento
    shape.dataset.delay = Math.random() * 1000; // Retraso entre 0 y 1000 ms
  });
  // Variables para manejar el movimiento
  let mouseX = 0;
  let mouseY = 0;
  // Escucha el movimiento del ratón
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 20 - 10;
    mouseY = (event.clientY / window.innerHeight) * 20 - 10;
  });
  // Función de animación
  function animateShapes() {
    shapes.forEach((shape, index) => {
      const floatY = Math.sin(Date.now() / 1000 + index) * 20; // Animación flotante en Y
      const x = parseFloat(shape.style.left) + mouseX;
      const y = parseFloat(shape.style.top) + floatY;
      shape.style.transform = `translate(${mouseX}px, ${floatY}px)`;
    });
    requestAnimationFrame(animateShapes); // Solicita el siguiente cuadro de animación
  }
  // Inicia la animación
  animateShapes();

  // Ajustar altura del parallax al total del content
  function adjustParallaxHeight() {
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const contentHeight = content.offsetHeight;
    // console.log('Content Height:', contentHeight);
    if (isFirefox) {
      if (mobileVersion) {
        parallaxBackground.style.transform = 'translateZ(-10px) scale(2.1)';
        parallaxBackground.style.height = `${contentHeight * 0.67}px`;
      } else {
        parallaxBackground.style.height = `${contentHeight * 0.71}px`;
        parallaxBackground.style.transform = 'translateZ(-10px) scale(2.1)';
      }
    } else {
      parallaxBackground.style.height = `${contentHeight}px`;
    }
  }

  adjustParallaxHeight();

  //Manejo de eventos click
  document.addEventListener('click', (e) => {
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      $scrollToBottom.style.display = 'block';
      document.querySelector('#header').scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    //Scroll to bottom general
    if (e.target.matches('#scroll-to-bottom')) {
      const parallaxContainer = document.querySelector('#parallax-container');
      if (parallaxContainer) {
        parallaxContainer.scrollTo({
          behavior: 'smooth',
          top: parallaxContainer.scrollHeight,
        });
      }
    }
  });

  //Scroll to sections
  document.querySelectorAll('.fa-chevron-down').forEach((button, index) => {
    button.addEventListener('click', () => {
      const sectionId = index === 0 ? '#seccion-skills' : '#seccion-proyectos';
      document.querySelector(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  //Long press en mobile, click derecho en pc
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    //Click derecho en profile pic
    if (event.target.matches('img#profile-pic')) {
      // Agregar algun efecto quizas
    }
  });

  // Reasignación del tipo de ventana durante evento resize
  window.addEventListener('resize', (e) => {
    mobileVersion = window.innerWidth / window.innerHeight < 0.8 ? true : false;
    adjustParallaxHeight();
    updateViewportMode();
    console.log('Mobile version:', mobileVersion);
  });
});
