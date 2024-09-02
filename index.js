//Establecer todo el js después de la carga del dom:
document.addEventListener('DOMContentLoaded', (e) => {
  const $scrollToBottom = document.querySelector('#scroll-to-bottom');

  //Variables y constantes de uso global:
  const mobileVersionMaxAspectRatio = 0.8;
  let mobileVersion =
    window.innerWidth / window.innerHeight < 0.8 ? true : false;

  // Parallax background height adjustment
  const content = document.getElementById('content');
  const parallaxBackground = document.getElementById('parallax-background');

  function adjustParallaxHeight() {
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const contentHeight = content.offsetHeight;
    console.log('Content Height:', contentHeight);
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
    console.log('Mobile version:', mobileVersion);
    adjustParallaxHeight();
  });
});
