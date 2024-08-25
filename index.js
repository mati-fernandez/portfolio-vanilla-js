//Establecer todo el js después de la carga del dom:
document.addEventListener('DOMContentLoaded', (e) => {
  const $scrollToBottom = document.querySelector('#scroll-to-bottom');

  //Variables y constantes de uso global:
  const wideVersionMinWidth = 800;
  let wideVersion = window.innerWidth > wideVersionMinWidth ? true : false;

  /************************* FUNCIONES ******************************/

  //Manejo de eventos click
  document.addEventListener('click', (e) => {
    //Manejo de los botones flecha animadas para deslizar pagina
    if (e.target.matches('#first-page')) {
      document.querySelector('#seccion-aptitudes').scrollIntoView();
    }
    if (e.target.matches('#second-page')) {
      document.querySelector('#seccion-tecnologias').scrollIntoView();
    }
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

  //Manejo de eventos hover
  document.addEventListener('mouseover', (e) => {
    //Manejo del hover en profile-pic
    // DESKTOP
    if (window.innerWidth > wideVersionMinWidth) {
      if (e.target.matches('#prof-pic-area')) {
        console.log('Mouseover PC');
        // MOBILE
      } else {
        if (e.target.matches('#caja-cara')) {
          console.log('Mouseover MOBILE');
        }
      }
    }
  });

  //Manejo de eventos mouseout
  document.addEventListener('mouseout', (e) => {
    //Manejo del mouseout en profile pic
    if (window.innerWidth > wideVersionMinWidth) {
      if (e.target.matches('#prof-pic-area')) {
        console.log('mouseout PC');
      }
    } else {
      if (e.target.matches('#caja-cara')) {
        console.log('mouseout MOBILE');
      }
    }
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
    // console.log('Resize event, window innerWidth', e.target.innerWidth);
    if (e.target.innerWidth > wideVersionMinWidth && !wideVersion) {
      wideVersion = true;
      console.log('Wide version', wideVersion);
    } else if (e.target.innerWidth <= wideVersionMinWidth && wideVersion) {
      wideVersion = false;
      console.log('Wide version', wideVersion);
    }
  });
});
