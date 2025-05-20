import { modalHandler } from './modalHandler.js';

window.appData = null;
window.appImages = null;
window.$secondaryProjects = null;
window.$secondaryOdysseys = null;
window.$secondaryCerts = null;

let endpointMode = 'build';

//Dev mode btn
const $devModeBtn = document.querySelector('#dev-mode-btn');
$devModeBtn.addEventListener('click', (e) => {
  //Primero limpia los nodos dinámicos por si tenían algo
  const nodes = document.querySelectorAll('.pec');
  nodes.forEach((node) => (node.innerHTML = ''));
  if ($devModeBtn.textContent.includes('Build')) {
    $devModeBtn.innerHTML = 'Dev <br/> Endpoint';
    $devModeBtn.classList.add('danger-btn');
    endpointMode = 'Dev';
    loadResources();
  } else {
    $devModeBtn.innerHTML = 'Build <br/> Endpoint';
    $devModeBtn.classList.remove('danger-btn');
    endpointMode = 'build';
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

  const baseUrl =
    endpointMode === 'build'
      ? 'https://portfolio-4oh.pages.dev/'
      : 'http://localhost:5500/'; // El 103 podría ser dinamico y probar cual responde. Esto lo cambie para poder usar en cel. Igual no anda por alguna razon
  const imagesEndpoint = `${baseUrl}images.json`;
  const textsEndpoint = `${baseUrl}es.json`;

  // Imágenes
  try {
    const response = await fetch(imagesEndpoint);
    window.appImages = await response.json();
  } catch (error) {
    console.log(
      'Error al cargar las imágenes de la app:',
      error,
      '\n\nREVISASTE PUERTO PARA IMAGENES???\n\n'
    );
  }

  // Textos
  try {
    const response = await fetch(textsEndpoint);
    window.appData = await response.json();
  } catch (error) {
    console.log(
      'Error al cargar el texto de la app:',
      error,
      '\n\nREVISASTE PUERTO PARA TEXTOS???\n\n'
    );
  }

  // Crear elemento info
  const $info = document.createElement('p');
  $info.textContent = 'i';
  $info.classList.add('info');

  // Declarar variables
  let title = null;
  let clone = null;
  let titleContainer = null;

  // Info de la sección presentación
  const $seccionPresentacion = document.querySelector('#seccion-presentacion');
  clone = $info.cloneNode(true);
  $seccionPresentacion.appendChild(clone);
  const presentacionModalTitle =
    window.appData.projects.projectsList.portfolioJS.title;
  const presentacionModalText =
    window.appData.projects.projectsList.portfolioJS.description;
  clone.addEventListener('click', () =>
    modalHandler(presentacionModalTitle, presentacionModalText)
  );

  // Texto de botones de vista
  const $viewMoreProjects = document.querySelector('#view-more-projects');
  const $viewLessProjects = document.querySelector('#view-less-projects');
  const $viewMoreOdysseys = document.querySelector('#view-more-odysseys');
  const $viewLessOdysseys = document.querySelector('#view-less-odysseys');
  const $viewMoreCert = document.querySelector('#view-more-cert');
  const $viewLessCert = document.querySelector('#view-less-cert');

  $viewMoreProjects.textContent = window.appData.projects.buttons.viewMore;
  $viewLessProjects.textContent = window.appData.projects.buttons.viewLess;
  $viewMoreOdysseys.textContent = window.appData.odyssey.buttons.viewMore;
  $viewLessOdysseys.textContent = window.appData.odyssey.buttons.viewLess;
  $viewMoreCert.textContent = window.appData.certifications.buttons.viewMore;
  $viewLessCert.textContent = window.appData.certifications.buttons.viewLess;

  document.querySelector('#presentacion').textContent =
    window.appData.description;

  // Agregar titulo e info a proyectos
  const divProyectos = document.querySelector('#proyectos');
  titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  divProyectos.insertAdjacentElement('beforebegin', titleContainer);
  title = document.createElement('h2');
  title.textContent = `${window.appData.menu.projects}`;
  titleContainer.appendChild(title);
  clone = $info.cloneNode(true);
  titleContainer.appendChild(clone);

  // Agregar evento al botón de info de las secciones
  const projectsModalTitle = window.appData.projects.info.title;
  const projectsModalText = window.appData.projects.info.text;
  clone.addEventListener('click', () =>
    modalHandler(projectsModalTitle, projectsModalText)
  );

  // Agregar textos de proyectos
  Object.entries(window.appData.projects.projectsList).forEach(
    ([key, project]) => {
      if (key === 'portfolioJS') return;
      const divCard = document.createElement('div');
      divCard.classList.add('card');

      const h4 = document.createElement('h4');
      const anchor = document.createElement('a');
      anchor.textContent = project.open;
      anchor.target = '_blank';
      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('buttons');
      const moreInfo = document.createElement('a');
      moreInfo.textContent = '+Info';
      moreInfo.classList.add('more-info');
      moreInfo.addEventListener('click', () =>
        modalHandler(project.title, project.description)
      );

      // Crear la estructura
      divCard.appendChild(h4);
      h4.textContent = project.title;
      divCard.appendChild(buttonsDiv);
      buttonsDiv.appendChild(anchor);
      buttonsDiv.appendChild(moreInfo);
      divProyectos.appendChild(divCard);
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

  // Agregar evento al botón de info de las secciones
  const odyssseyModalTitle = window.appData.odyssey.info.title;
  const odysseyModalText = window.appData.odyssey.info.text;
  clone.addEventListener('click', () =>
    modalHandler(odyssseyModalTitle, odysseyModalText)
  );

  // Agregar textos de odyssey
  Object.values(window.appData.odyssey.odysseyList).forEach((exercise) => {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const h4 = document.createElement('h4');
    const anchor = document.createElement('a');
    anchor.textContent = exercise.open;
    anchor.target = '_blank';
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    const moreInfo = document.createElement('a');
    moreInfo.textContent = '+Info';
    moreInfo.classList.add('more-info');
    moreInfo.addEventListener('click', () =>
      modalHandler(exercise.title, exercise.description)
    );

    // Crear la estructura
    divOdyssey.appendChild(divCard);
    divCard.appendChild(h4);
    h4.textContent = exercise.title;
    divCard.appendChild(buttonsDiv);
    buttonsDiv.appendChild(anchor);
    buttonsDiv.appendChild(moreInfo);
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

  // Agregar evento al botón de info de las secciones
  const certsModalTitle = window.appData.certifications.info.title;
  const certsModalText = window.appData.certifications.info.text;
  clone.addEventListener('click', () =>
    modalHandler(certsModalTitle, certsModalText)
  );

  // Agregar textos de certificaciones
  Object.values(window.appData.certifications.certificationsList).forEach(
    (certification) => {
      const divCard = document.createElement('div');
      divCard.classList.add('card');

      const h4 = document.createElement('h4');
      const anchor = document.createElement('a');
      anchor.textContent = certification.open;
      anchor.target = '_blank';
      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('buttons');
      const moreInfo = document.createElement('a');
      moreInfo.textContent = '+Info';
      moreInfo.classList.add('more-info');
      moreInfo.addEventListener('click', () =>
        modalHandler(certification.title, certification.description)
      );

      // Crear la estructura
      divCertificaciones.appendChild(divCard);
      divCard.appendChild(h4);
      h4.textContent = certification.title;
      divCard.appendChild(buttonsDiv);
      buttonsDiv.appendChild(anchor);
      buttonsDiv.appendChild(moreInfo);
    }
  );

  /*******************************************************************************/
  /****************** Imágenes y enlaces (Skills están acá por ahora) ************/
  /*******************************************************************************/

  const skills = document.querySelector('.skills-list');
  title = document.createElement('h2');
  title.textContent = `${window.appData.menu.skills}`;
  skills.insertAdjacentElement('beforebegin', title);
  // Agregar skills
  Object.entries(window.appImages.skills).forEach(([key, skill]) => {
    const li = document.createElement('li');
    const divContainer = document.createElement('div');
    divContainer.classList.add('skill-container');

    const img = document.createElement('img');
    img.classList.add('tech');
    img.src = `${baseUrl}/${skill.src}`;
    img.alt = window.appData.skills[key].title;

    const span = document.createElement('span');
    span.classList.add('skill-name');
    span.textContent = window.appData.skills[key].title;

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

  function applyImg(key, $item, $section, index, sectionKey) {
    let path = '';
    switch (sectionKey) {
      case 'projects':
        path = 'appData.projects.projectsList';
        break;
      case 'odyssey':
        path = 'appData.odyssey.odysseyList';
        break;
      case 'certifications':
        path = 'appData.certification.certificationList';
        break;
    }
    const img = document.createElement('img');
    const h4 = $section[index].querySelector('h4');
    h4.insertAdjacentElement('afterend', img);
    img.id = key;
    img.src = `${baseUrl}${window.appImages[sectionKey][key].src}`;
    const obj = path.split('.').reduce((acc, key) => acc?.[key], globalThis);
    img.alt = obj?.[key].title;
    $section[index].querySelector('a').href = $item.link;

    if (window.appImages[sectionKey][key].class === 'secondary')
      $section[index].classList.add('secondary');
  }

  // Agregar imágenes y enlaces a proyectos
  const proyectos = document.querySelectorAll('#proyectos .card');
  let projectsCount = 0; // Acá no usé index porque estoy sacando un proyecto (Portfolio actual)

  Object.entries(window.appImages.projects).forEach(([key, project]) => {
    if (key === 'portfolioJS') return;
    applyImg(key, project, proyectos, projectsCount, 'projects');
    projectsCount++;
  });
  window.$secondaryProjects = document.querySelectorAll(
    '#proyectos > .card.secondary'
  );

  // Agregar imágenes y enlaces a odysseys
  const odysseys = document.querySelectorAll('#odysseys .card');

  Object.entries(window.appImages.odyssey).forEach(([key, odyssey], index) => {
    applyImg(key, odyssey, odysseys, index, 'odyssey');
  });
  window.$secondaryOdysseys = document.querySelectorAll(
    '#odysseys > .card.secondary'
  );

  // Agregar imágenes, enlaces y clases a certificaciones
  const certs = document.querySelectorAll('#certificaciones .card');

  Object.entries(window.appImages.certifications).forEach(
    ([key, cert], index) => {
      applyImg(key, cert, certs, index, 'certifications');
    }
  );
  window.$secondaryCerts = document.querySelectorAll(
    '#certificaciones > .card.secondary'
  );
};
