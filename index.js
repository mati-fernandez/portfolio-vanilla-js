//Establecer todo el js después de la carga del dom:
document.addEventListener('DOMContentLoaded', (e) => {
  // Selectores
  const $scrollToBottom = document.querySelector('#scroll-to-bottom');
  const content = document.getElementById('content');
  const parallaxBackground = document.getElementById('parallax-background');

  //Variables y constantes de uso global:
  const mobileVersionMaxAspectRatio = 0.8;
  let mobileVersion =
    window.innerWidth / window.innerHeight < 0.8 ? true : false;

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
        parallaxBackground.style.height = `${contentHeight * 0.69}px`;
      } else {
        parallaxBackground.style.height = `${contentHeight * 0.72}px`;
        parallaxBackground.style.transform = 'translateZ(-10px) scale(2.1)';
      }
    } else {
      parallaxBackground.style.height = `${contentHeight}px`;
    }
  }

  adjustParallaxHeight();

  // Asignación de aspect ratio a imágenes de habilidades
  document.querySelectorAll('.skills-list img').forEach((img) => {
    img.addEventListener('load', () => {
      if (img.naturalWidth > img.naturalHeight) {
        img.classList.add('landscape');
      } else {
        img.classList.add('portrait');
      }
    });

    // Si la imagen ya se cargó (para navegadores que no disparan 'load' en imágenes ya cargadas)
    if (img.complete) {
      img.dispatchEvent(new Event('load'));
    }
  });

  //Manejo de eventos click
  document.addEventListener('click', (e) => {
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      $scrollToBottom.style.display = 'block';
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
    //Scroll to bottom general
    if (e.target.matches('#scroll-to-bottom')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 50000,
      });
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

  window.addEventListener('resize', (e) => {
    mobileVersion = window.innerWidth / window.innerHeight < 0.8 ? true : false;
    // console.log('Mobile version:', mobileVersion);
    adjustParallaxHeight();
  });
});
