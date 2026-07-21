import { modalHandler } from './modalHandler.js';

window.appData = null;
window.appIndex = null;
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
  document.querySelectorAll('.cert-category-tabs').forEach((el) => {
    el.remove();
  });
};

export const loadResources = async () => {
  clearSectionContent();

  const baseUrl =
    endpointMode === 'build'
      ? 'https://portfolio-4oh.pages.dev/'
      : 'http://localhost:5500/'; // El 103 podría ser dinamico y probar cual responde. Esto lo cambie para poder usar en cel. Igual no anda por alguna razon
  const indexEndpoint = `${baseUrl}index.json`;
  const textsEndpoint = `${baseUrl}es.json`;

  // Índices
  try {
    const response = await fetch(indexEndpoint);
    window.appIndex = await response.json();
  } catch (error) {
    console.log(
      'Error al cargar los índices de la app:',
      error,
      '\n\nREVISASTE PUERTO PARA INDICES???\n\n',
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
      '\n\nREVISASTE PUERTO PARA TEXTOS???\n\n',
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
    window.appData.projects.items.portfolioJS.title;
  const presentacionModalText =
    window.appData.projects.items.portfolioJS.description;
  clone.addEventListener('click', () =>
    modalHandler(presentacionModalTitle, presentacionModalText),
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
    modalHandler(projectsModalTitle, projectsModalText),
  );

  // Agregar textos de proyectos
  Object.entries(window.appData.projects.items).forEach(([key, project]) => {
    if (key === 'portfolioJS') return;
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const h4 = document.createElement('h4');
    const anchor = document.createElement('a');
    anchor.textContent = window.appData.projects.buttons.open;
    anchor.target = '_blank';
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    const moreInfo = document.createElement('a');
    moreInfo.textContent = '+Info';
    moreInfo.classList.add('more-info');
    moreInfo.addEventListener('click', () =>
      modalHandler(project.title, project.description),
    );

    // Crear la estructura
    divCard.appendChild(h4);
    h4.textContent = project.title;
    divCard.appendChild(buttonsDiv);
    buttonsDiv.appendChild(anchor);
    buttonsDiv.appendChild(moreInfo);
    divProyectos.appendChild(divCard);
  });

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
    modalHandler(odyssseyModalTitle, odysseyModalText),
  );

  // Agregar textos de odyssey
  Object.values(window.appData.odyssey.items).forEach((exercise) => {
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    const h4 = document.createElement('h4');
    const anchor = document.createElement('a');
    anchor.textContent = window.appData.odyssey.buttons.open;
    anchor.target = '_blank';
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    const moreInfo = document.createElement('a');
    moreInfo.textContent = '+Info';
    moreInfo.classList.add('more-info');
    moreInfo.addEventListener('click', () =>
      modalHandler(exercise.title, exercise.description),
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
    modalHandler(certsModalTitle, certsModalText),
  );

  const certCategoryTabs = document.createElement('div');
  certCategoryTabs.classList.add('cert-category-tabs');
  divCertificaciones.insertAdjacentElement('beforebegin', certCategoryTabs);

  function createCertificationCard(
    key,
    certificationImage,
    categoryGroup,
    level,
  ) {
    const certification = window.appData.certifications.items[key];
    if (!certification) return;

    const divCard = document.createElement('div');
    divCard.classList.add('card');
    divCard.dataset.certification = key;
    if (level === 'secondary') divCard.classList.add('secondary');

    const h4 = document.createElement('h4');
    const img = document.createElement('img');
    const anchor = document.createElement('a');
    anchor.textContent = window.appData.certifications.buttons.open;
    anchor.target = '_blank';
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');
    const moreInfo = document.createElement('a');
    moreInfo.textContent = '+Info';
    moreInfo.classList.add('more-info');
    moreInfo.addEventListener('click', () =>
      modalHandler(certification.title, certification.description),
    );

    const link = certificationImage.link;
    const realLink = link.includes('images') ? `${baseUrl}${link}` : link;

    h4.textContent = certification.title;
    img.id = key;
    img.src = `${baseUrl}${certificationImage.src}`;
    img.alt = certification.title;
    anchor.href = realLink;

    // Crear la estructura
    categoryGroup.appendChild(divCard);
    divCard.appendChild(h4);
    h4.insertAdjacentElement('afterend', img);
    divCard.appendChild(buttonsDiv);
    buttonsDiv.appendChild(anchor);
    buttonsDiv.appendChild(moreInfo);
  }

  Object.entries(window.appIndex.certifications).forEach(
    ([category, content], index) => {
      const categoryButton = document.createElement('button');
      categoryButton.type = 'button';
      categoryButton.classList.add('cert-category-tab');
      categoryButton.dataset.category = category;
      categoryButton.textContent = content.title;
      if (index === 0) categoryButton.classList.add('active');
      certCategoryTabs.appendChild(categoryButton);

      const categoryGroup = document.createElement('div');
      categoryGroup.classList.add('cert-category-group');
      categoryGroup.dataset.category = category;
      if (index !== 0) categoryGroup.hidden = true;

      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = content.title;
      categoryGroup.appendChild(categoryTitle);
      divCertificaciones.appendChild(categoryGroup);

      Object.entries(content.primary ?? {}).forEach(
        ([key, certificationImage]) => {
          createCertificationCard(
            key,
            certificationImage,
            categoryGroup,
            'primary',
          );
        },
      );

      Object.entries(content.secondary ?? {}).forEach(
        ([key, certificationImage]) => {
          createCertificationCard(
            key,
            certificationImage,
            categoryGroup,
            'secondary',
          );
        },
      );
    },
  );

  /*******************************************************************************/
  /****************** Index (Skills están acá por ahora) ************/
  /*******************************************************************************/

  const skills = document.querySelector('.skills-list');
  title = document.createElement('h2');
  title.textContent = `${window.appData.menu.skills}`;
  skills.insertAdjacentElement('beforebegin', title);
  // Agregar skills
  Object.entries(window.appIndex.skills).forEach(([key, skill]) => {
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
        path = 'appData.projects.items';
        break;
      case 'odyssey':
        path = 'appData.odyssey.items';
        break;
    }
    const img = document.createElement('img');
    const h4 = $section[index].querySelector('h4');
    h4.insertAdjacentElement('afterend', img);
    img.id = key;
    img.src = `${baseUrl}${window.appIndex[sectionKey][key].src}`;
    const obj = path.split('.').reduce((acc, key) => acc?.[key], globalThis);
    img.alt = obj?.[key].title;

    // Enlace condicional para certificados que no están en la nube
    const link = $item.link;
    const realLink = link.includes('images') ? `${baseUrl}${link}` : link;
    $section[index].querySelector('a').href = realLink;

    const { level } = window.appIndex[sectionKey][key];

    if (level === 'secondary') $section[index].classList.add('secondary');
  }

  // Agregar imágenes y enlaces a proyectos
  const proyectos = document.querySelectorAll('#proyectos .card');
  let projectsCount = 0; // Acá no usé index porque estoy sacando un proyecto (Portfolio actual)

  Object.entries(window.appIndex.projects).forEach(([key, project]) => {
    if (key === 'portfolioJS') return;
    applyImg(key, project, proyectos, projectsCount, 'projects');
    projectsCount++;
  });
  window.$secondaryProjects = document.querySelectorAll(
    '#proyectos > .card.secondary',
  );

  // Agregar imágenes y enlaces a odysseys
  const odysseys = document.querySelectorAll('#odysseys .card');

  Object.entries(window.appIndex.odyssey).forEach(([key, odyssey], index) => {
    applyImg(key, odyssey, odysseys, index, 'odyssey');
  });
  window.$secondaryOdysseys = document.querySelectorAll(
    '#odysseys > .card.secondary',
  );

  // Agregar imágenes, enlaces y categorías a certificaciones
  window.$secondaryCerts = document.querySelectorAll(
    '#certificaciones .card.secondary',
  );
  window.dispatchEvent(new Event('resourcesLoaded'));
};
