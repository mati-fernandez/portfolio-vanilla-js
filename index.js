window.appData = null;
window.appImages = null;
//Establecer todo el js después de la carga del dom:
document.addEventListener('DOMContentLoaded', async (e) => {
  // Carga de recursos
  // Textos
  try {
    const response = await fetch('https://portfolio-4oh.pages.dev/es.json');
    window.appData = await response.json();
    document.querySelector('#presentacion').textContent =
      window.appData.description;
    // Agregar textos de proyectos
    let projectsCounter = 0;
    Object.entries(window.appData.projects.projectsList).forEach(
      ([key, project]) => {
        if (key === 'portfolioJS') return;
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const h4 = document.createElement('h4');
        const anchor = document.createElement('a');
        anchor.textContent = project.open;
        anchor.target = '_blank';

        const divSpace = document.createElement('div');
        divSpace.classList.add('space');

        // Crear la estructura
        const divProyectos = document.querySelector('#proyectos');
        divProyectos.appendChild(divCard);
        divCard.appendChild(h4);
        h4.textContent = project.title;
        divCard.appendChild(anchor);
        projectsCounter++;
        if (projectsCounter % 3 !== 0) divProyectos.appendChild(divSpace);
      }
    );
    // Agregar textos de ejercicios
    let exercisesCounter = 0;
    Object.values(window.appData.exercises.exercisesList).forEach(
      (exercise) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const h4 = document.createElement('h4');
        const anchor = document.createElement('a');
        anchor.textContent = exercise.open;
        anchor.target = '_blank';

        const divSpace = document.createElement('div');
        divSpace.classList.add('space');

        // Crear la estructura
        const divEjercicios = document.querySelector('#ejercicios');
        divEjercicios.appendChild(divCard);
        divCard.appendChild(h4);
        h4.textContent = exercise.title;
        divCard.appendChild(anchor);
        exercisesCounter++;
        if (exercisesCounter % 3 !== 0) divEjercicios.appendChild(divSpace);
      }
    );
    // Agregar textos de certificaciones
    let certificationsCounter = 0;
    Object.values(window.appData.certifications.certificationsList).forEach(
      (certification) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const h4 = document.createElement('h4');
        const anchor = document.createElement('a');
        anchor.textContent = certification.open;
        anchor.target = '_blank';

        const divSpace = document.createElement('div');
        divSpace.classList.add('space');

        // Crear la estructura
        const divCertificaciones = document.querySelector('#certificaciones');
        divCertificaciones.appendChild(divCard);
        divCard.appendChild(h4);
        h4.textContent = certification.title;
        divCard.appendChild(anchor);
        certificationsCounter++;
        if (certificationsCounter % 3 !== 0)
          divCertificaciones.appendChild(divSpace);
      }
    );
  } catch (error) {
    console.log('Error al cargar el texto de la app:', error);
  }
  /*******************************************************************************/
  // Imágenes (Skills están acá por ahora)
  try {
    const response = await fetch('https://portfolio-4oh.pages.dev/images.json');
    window.appImages = await response.json();
    // Agregar skills
    Object.values(window.appImages.skills).forEach((skill) => {
      const li = document.createElement('li');
      const divContainer = document.createElement('div');
      divContainer.classList.add('skill-container');

      const img = document.createElement('img');
      img.classList.add('tech');
      img.src = skill.src;
      img.alt = skill.alt;

      const span = document.createElement('span');
      span.classList.add('skill-name');
      span.textContent = skill.alt;

      const divProgressBar = document.createElement('div');
      divProgressBar.classList.add('progress-bar');

      const divProgress = document.createElement('div');
      divProgress.classList.add('progress');
      divProgress.style.width = skill.progress;

      // Construir la estructura
      const skills = document.querySelector('.skills-list');
      skills.appendChild(li);
      li.appendChild(divContainer);
      divContainer.appendChild(img);
      divContainer.appendChild(span);
      li.appendChild(divProgressBar);
      divProgressBar.appendChild(divProgress);
    });

    // Agregar imágenes y enlaces a proyectos
    const proyectos = document.querySelectorAll('#proyectos .card');
    let projecCount = 0;
    Object.entries(window.appImages.projects).forEach(([key, project]) => {
      if (key === 'portfolioJS') return;
      const img = document.createElement('img');
      const h4 = proyectos[projecCount].querySelector('h4');
      h4.insertAdjacentElement('afterend', img);
      img.id = key;
      img.src = project.src;
      img.alt = project.alt;

      proyectos[projecCount].querySelector('a').href = project.link;
      projecCount++;
    });
    // Agregar imágenes y enlaces a ejercicios
    const ejercicios = document.querySelectorAll('#ejercicios .card');
    Object.entries(window.appImages.exercises).forEach(
      ([key, exercise], index) => {
        const img = document.createElement('img');
        const h4 = ejercicios[index].querySelector('h4');
        h4.insertAdjacentElement('afterend', img);
        img.id = key;
        img.src = exercise.src;
        img.alt = exercise.alt;

        ejercicios[index].querySelector('a').href = exercise.link;
      }
    );
    // Agregar imágenes, enlaces y clases a certificaciones
    const certificaciones = document.querySelectorAll('#certificaciones .card');
    Object.entries(window.appImages.certifications).forEach(
      ([key, certification], index) => {
        const img = document.createElement('img');
        const h4 = certificaciones[index].querySelector('h4');
        h4.insertAdjacentElement('afterend', img);
        img.id = key;
        img.src = certification.src;
        img.alt = certification.alt;

        certificaciones[index].querySelector('a').href = certification.link;

        if (certification.class === 'secondary')
          certificaciones[index].classList.add('secondary');
      }
    );
  } catch (error) {
    console.log('Error al cargar las imágenes de la app:', error);
  }

  // Selectores
  const $scrollToBottom = document.querySelector('#scroll-to-bottom');
  const content = document.getElementById('content');
  const parallaxBackground = document.getElementById('parallax-background');

  //Variables y constantes de uso global:
  const mobileVersionMaxAspectRatio = 0.8;
  let mobileVersion =
    window.innerWidth / window.innerHeight < 0.8 ? true : false;

  // View more
  const $viewMoreCert = document.querySelector('#view-more-cert');
  const $viewLessCert = document.querySelector('#view-less-cert');
  const $secondaryCerts = document.querySelectorAll('.card.secondary');

  $viewMoreCert.addEventListener('click', () => {
    $viewMoreCert.style.display = 'none';
    $viewLessCert.style.display = 'inline-block';
    $secondaryCerts.forEach((card) => (card.style.display = 'grid'));
  });

  $viewLessCert.addEventListener('click', () => {
    $viewMoreCert.style.display = 'inline-block';
    $viewLessCert.style.display = 'none';
    $secondaryCerts.forEach((card) => (card.style.display = 'none'));
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

  window.addEventListener('resize', (e) => {
    mobileVersion = window.innerWidth / window.innerHeight < 0.8 ? true : false;
    // console.log('Mobile version:', mobileVersion);
    adjustParallaxHeight();
  });
});
