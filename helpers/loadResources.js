import { modalHandler } from './modalHandler.js';

window.appData = null;
window.appImages = null;
window.$secondaryOdysseys = null;
window.$secondaryCerts = null;

let endpointMode = 'build';

//Dev mode btn
const $devModeBtn = document.querySelector('#dev-mode-btn');
$devModeBtn.addEventListener('click', (e) => {
  if ($devModeBtn.textContent.includes('Build')) {
    $devModeBtn.innerHTML = 'Dev <br/> Endpoint';
    $devModeBtn.classList.add('danger-btn');
    endpointMode = 'Dev';
    loadResources();
  } else {
    $devModeBtn.innerHTML = 'Build <br/> Endpoint';
    $devModeBtn.classList.remove('danger-btn');
    endpointMode = 'Build';
    loadResources();
  }
  console.log('Endpoint Mode:', endpointMode);
});

// Limpia si habían recursos previos
const clearSectionContent = () => {
  document.querySelectorAll('.skills-list, .pec').forEach((el) => {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  });
  document.querySelectorAll('.title-container').forEach((el) => {
    el.remove();
  });
};

export const loadResources = async () => {
  clearSectionContent();
  const translationsUrl =
    endpointMode === 'build'
      ? 'https://portfolio-4oh.pages.dev/es.json'
      : 'http://127.0.0.1:5500/es.json';
  // Textos
  try {
    const response = await fetch(translationsUrl);
    window.appData = await response.json();

    // Crear elemento info
    const $info = document.createElement('p');
    $info.textContent = 'i';
    $info.classList.add('info');

    // Declarar variables
    let title = null;
    let clone = null;
    let titleContainer = null;

    // Agregar titulo e info a proyectos
    document.querySelector('#presentacion').textContent =
      window.appData.description;
    const divProyectos = document.querySelector('#proyectos');
    titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    divProyectos.insertAdjacentElement('beforebegin', titleContainer);
    title = document.createElement('h2');
    title.textContent = `${window.appData.menu.projects}`;
    titleContainer.appendChild(title);
    clone = $info.cloneNode(true);
    titleContainer.appendChild(clone);
    clone.addEventListener('click', () => modalHandler('projects'));

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
        divProyectos.appendChild(divCard);
        divCard.appendChild(h4);
        h4.textContent = project.title;
        divCard.appendChild(anchor);
        projectsCounter++;
        if (projectsCounter % 3 !== 0) divProyectos.appendChild(divSpace);
      }
    );

    // Agregar título e info a odyssey
    const divOdyssey = document.querySelector('#odysseys');
    title = document.createElement('h2');
    title.textContent = `${window.appData.menu.odyssey}`;
    divOdyssey.insertAdjacentElement('beforebegin', title);
    titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    divOdyssey.insertAdjacentElement('beforebegin', titleContainer);
    titleContainer.appendChild(title);
    clone = $info.cloneNode(true);
    titleContainer.appendChild(clone);
    clone.addEventListener('click', () => modalHandler('odyssey'));

    // Agregar textos de odyssey
    let odysseyCounter = 0;
    Object.values(window.appData.odyssey.odysseyList).forEach((exercise) => {
      const divCard = document.createElement('div');
      divCard.classList.add('card');

      const h4 = document.createElement('h4');
      const anchor = document.createElement('a');
      anchor.textContent = exercise.open;
      anchor.target = '_blank';

      const divSpace = document.createElement('div');
      divSpace.classList.add('space');

      // Crear la estructura
      divOdyssey.appendChild(divCard);
      divCard.appendChild(h4);
      h4.textContent = exercise.title;
      divCard.appendChild(anchor);
      odysseyCounter++;
      if (odysseyCounter % 3 !== 0) divOdyssey.appendChild(divSpace);
    });

    // Agregar título e info a certificaciones
    const divCertificaciones = document.querySelector('#certificaciones');
    titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    divCertificaciones.insertAdjacentElement('beforebegin', titleContainer);
    title = document.createElement('h2');
    title.textContent = `${window.appData.menu.certifications}`;
    divCertificaciones.insertAdjacentElement('beforebegin', titleContainer);
    titleContainer.appendChild(title);
    clone = $info.cloneNode(true);
    titleContainer.appendChild(clone);
    clone.addEventListener('click', () => modalHandler('certifications'));

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
  /****************** Imágenes (Skills están acá por ahora) **********************/
  /*******************************************************************************/
  const imagesUrlBase =
    endpointMode === 'build'
      ? 'https://portfolio-4oh.pages.dev/'
      : 'http://127.0.0.1:5500/';
  const imagesUrlEndpoint = 'images.json';
  try {
    const response = await fetch(`${imagesUrlBase}/${imagesUrlEndpoint}`);
    window.appImages = await response.json();
    const skills = document.querySelector('.skills-list');
    const title = document.createElement('h2');
    title.textContent = `${window.appData.menu.skills}`;
    skills.insertAdjacentElement('beforebegin', title);
    // Agregar skills
    Object.values(window.appImages.skills).forEach((skill) => {
      const li = document.createElement('li');
      const divContainer = document.createElement('div');
      divContainer.classList.add('skill-container');

      const img = document.createElement('img');
      img.classList.add('tech');
      img.src = `${imagesUrlBase}/${skill.src}`;
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
      skills.appendChild(li);
      li.appendChild(divContainer);
      divContainer.appendChild(img);
      divContainer.appendChild(span);
      li.appendChild(divProgressBar);
      divProgressBar.appendChild(divProgress);
    });

    // Retraso para que no se vea el destello de skills sombre home en mobile
    const timeOutSkills = setTimeout(() => {
      document.querySelector('#seccion-skills').style.visibility = 'visible';
      clearTimeout(timeOutSkills);
    }, 1000);

    // Agregar imágenes y enlaces a proyectos
    const proyectos = document.querySelectorAll('#proyectos .card');
    let projecCount = 0;
    Object.entries(window.appImages.projects).forEach(([key, project]) => {
      if (key === 'portfolioJS') return;
      const img = document.createElement('img');
      const h4 = proyectos[projecCount].querySelector('h4');
      h4.insertAdjacentElement('afterend', img);
      img.id = key;
      img.src = `${imagesUrlBase}/${project.src}`;
      img.alt = project.alt;

      proyectos[projecCount].querySelector('a').href = project.link;
      projecCount++;
    });

    // Agregar imágenes y enlaces a odysseys
    const odysseys = document.querySelectorAll('#odysseys .card');
    Object.entries(window.appImages.odyssey).forEach(
      ([key, odyssey], index) => {
        const img = document.createElement('img');
        const h4 = odysseys[index].querySelector('h4');
        h4.insertAdjacentElement('afterend', img);
        img.id = key;
        img.src = `${imagesUrlBase}/${odyssey.src}`;
        img.alt = odyssey.alt;

        odysseys[index].querySelector('a').href = odyssey.link;

        if (odyssey.class === 'secondary')
          odysseys[index].classList.add('secondary');
      }
    );
    window.$secondaryOdysseys = document.querySelectorAll(
      '#odysseys > .card.secondary'
    );

    // Agregar imágenes, enlaces y clases a certificaciones
    const certificaciones = document.querySelectorAll('#certificaciones .card');
    Object.entries(window.appImages.certifications).forEach(
      ([key, certification], index) => {
        const img = document.createElement('img');
        const h4 = certificaciones[index].querySelector('h4');
        h4.insertAdjacentElement('afterend', img);
        img.id = key;
        img.src = `${imagesUrlBase}/${certification.src}`;
        img.alt = certification.alt;

        certificaciones[index].querySelector('a').href = certification.link;

        if (certification.class === 'secondary')
          certificaciones[index].classList.add('secondary');
      }
    );
    $secondaryCerts = document.querySelectorAll(
      '#certificaciones > .card.secondary'
    );
  } catch (error) {
    console.log('Error al cargar las imágenes de la app:', error);
  }
};
