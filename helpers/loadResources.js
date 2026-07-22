import { modalHandler } from './modalHandler.js';

window.appData = null;
window.appIndex = null;
window.$secondaryProjects = null;
window.$secondaryOdysseys = null;
window.$secondaryCerts = null;

let endpointMode = 'build';

const $devModeBtn = document.querySelector('#dev-mode-btn');

$devModeBtn.addEventListener('click', () => {
  document.querySelectorAll('.pec').forEach((node) => (node.innerHTML = ''));

  if ($devModeBtn.textContent.includes('Build')) {
    $devModeBtn.innerHTML = 'Dev <br/> Endpoint';
    $devModeBtn.classList.add('danger-btn');
    endpointMode = 'Dev';
  } else {
    $devModeBtn.innerHTML = 'Build <br/> Endpoint';
    $devModeBtn.classList.remove('danger-btn');
    endpointMode = 'build';
  }

  loadResources();
  console.log('Endpoint Mode:', endpointMode);
});

const clearSectionContent = () => {
  document.querySelectorAll('.skills-list, .pec').forEach((el) => {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  });

  document.querySelectorAll('.title-container').forEach((el) => el.remove());
  document.querySelectorAll('.cert-category-tabs').forEach((el) => el.remove());
};

const fetchJson = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

export const loadResources = async () => {
  clearSectionContent();

  const baseUrl =
    endpointMode === 'build'
      ? 'https://portfolio-4oh.pages.dev/'
      : 'http://localhost:5500/';
  const indexEndpoint = `${baseUrl}index.json`;
  const textsEndpoint = `${baseUrl}es.json`;

  try {
    window.appIndex = await fetchJson(indexEndpoint);
  } catch (error) {
    window.appIndex = null;
    console.log(
      'Error al cargar los indices de la app:',
      error,
      '\n\nREVISASTE PUERTO PARA INDICES???\n\n',
    );
  }

  try {
    window.appData = await fetchJson(textsEndpoint);
  } catch (error) {
    window.appData = null;
    console.log(
      'Error al cargar el texto de la app:',
      error,
      '\n\nREVISASTE PUERTO PARA TEXTOS???\n\n',
    );
  }

  if (!window.appIndex || !window.appData) {
    window.dispatchEvent(new Event('resourcesLoaded'));
    return;
  }

  const appIndex = window.appIndex;
  const appData = window.appData;
  const $info = document.createElement('p');
  $info.textContent = 'i';
  $info.classList.add('info');

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element && text) element.textContent = text;
  };

  const resolveLink = (link) =>
    link?.includes('images') ? `${baseUrl}${link}` : link;

  const createTitleContainer = (target, text) => {
    if (!target || !text) return null;

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    target.insertAdjacentElement('beforebegin', titleContainer);

    const title = document.createElement('h2');
    title.textContent = text;
    titleContainer.appendChild(title);

    const info = $info.cloneNode(true);
    titleContainer.appendChild(info);

    return info;
  };

  const createResourceCard = ({
    key,
    textItem,
    indexItem,
    container,
    buttonText,
    secondary = false,
    dataAttribute,
  }) => {
    if (
      !textItem ||
      !indexItem?.src ||
      !indexItem?.link ||
      !buttonText ||
      !container
    ) {
      return;
    }

    const divCard = document.createElement('div');
    divCard.classList.add('card');
    if (secondary) divCard.classList.add('secondary');
    if (dataAttribute) divCard.dataset[dataAttribute] = key;

    const h4 = document.createElement('h4');
    h4.textContent = textItem.title;

    const img = document.createElement('img');
    img.id = key;
    img.src = `${baseUrl}${indexItem.src}`;
    img.alt = textItem.title;

    const anchor = document.createElement('a');
    anchor.textContent = buttonText;
    anchor.target = '_blank';
    anchor.href = resolveLink(indexItem.link);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const moreInfo = document.createElement('a');
    moreInfo.textContent = '+Info';
    moreInfo.classList.add('more-info');
    moreInfo.addEventListener('click', () =>
      modalHandler(textItem.title, textItem.description),
    );

    container.appendChild(divCard);
    divCard.appendChild(h4);
    h4.insertAdjacentElement('afterend', img);
    divCard.appendChild(buttonsDiv);
    buttonsDiv.appendChild(anchor);
    buttonsDiv.appendChild(moreInfo);
  };

  const renderGroupedIndexItems = ({
    indexItems,
    textItems,
    container,
    buttonText,
    skipKeys = [],
  }) => {
    Object.entries(indexItems?.primary ?? {}).forEach(([key, indexItem]) => {
      if (skipKeys.includes(key)) return;
      createResourceCard({
        key,
        textItem: textItems?.[key],
        indexItem,
        container,
        buttonText,
      });
    });

    Object.entries(indexItems?.secondary ?? {}).forEach(([key, indexItem]) => {
      if (skipKeys.includes(key)) return;
      createResourceCard({
        key,
        textItem: textItems?.[key],
        indexItem,
        container,
        buttonText,
        secondary: true,
      });
    });
  };

  const $seccionPresentacion = document.querySelector('#seccion-presentacion');
  const presentationInfo = $info.cloneNode(true);
  $seccionPresentacion?.appendChild(presentationInfo);
  presentationInfo.addEventListener('click', () => {
    const portfolio = appData.projects?.items?.portfolioJS;
    if (portfolio) modalHandler(portfolio.title, portfolio.description);
  });

  setText('#view-more-projects', appData.projects?.buttons?.viewMore);
  setText('#view-less-projects', appData.projects?.buttons?.viewLess);
  setText('#view-more-odysseys', appData.odyssey?.buttons?.viewMore);
  setText('#view-less-odysseys', appData.odyssey?.buttons?.viewLess);
  setText('#view-more-cert', appData.certifications?.buttons?.viewMore);
  setText('#view-less-cert', appData.certifications?.buttons?.viewLess);
  setText('#presentacion', appData.description);

  const divProyectos = document.querySelector('#proyectos');
  const projectsInfo = createTitleContainer(
    divProyectos,
    appData.menu?.projects,
  );
  projectsInfo?.addEventListener('click', () =>
    modalHandler(appData.projects?.info?.title, appData.projects?.info?.text),
  );
  renderGroupedIndexItems({
    indexItems: appIndex.projects,
    textItems: appData.projects?.items,
    container: divProyectos,
    buttonText: appData.projects?.buttons?.open,
    skipKeys: ['portfolioJS'],
  });

  const divOdyssey = document.querySelector('#odysseys');
  const odysseyInfo = createTitleContainer(divOdyssey, appData.menu?.odyssey);
  odysseyInfo?.addEventListener('click', () =>
    modalHandler(appData.odyssey?.info?.title, appData.odyssey?.info?.text),
  );
  renderGroupedIndexItems({
    indexItems: appIndex.odyssey,
    textItems: appData.odyssey?.items,
    container: divOdyssey,
    buttonText: appData.odyssey?.buttons?.open,
  });

  const divCertificaciones = document.querySelector('#certificaciones');
  const certsInfo = createTitleContainer(
    divCertificaciones,
    appData.menu?.certifications,
  );
  certsInfo?.addEventListener('click', () =>
    modalHandler(
      appData.certifications?.info?.title,
      appData.certifications?.info?.text,
    ),
  );

  const certCategoryTabs = document.createElement('div');
  certCategoryTabs.classList.add('cert-category-tabs');
  divCertificaciones?.insertAdjacentElement('beforebegin', certCategoryTabs);

  Object.entries(appIndex.certifications ?? {}).forEach(
    ([categoryKey, categoryIndex], index) => {
      const categoryButton = document.createElement('button');
      categoryButton.type = 'button';
      categoryButton.classList.add('cert-category-tab');
      categoryButton.dataset.category = categoryKey;
      categoryButton.textContent = categoryIndex.title;
      if (index === 0) categoryButton.classList.add('active');
      certCategoryTabs.appendChild(categoryButton);

      const categoryGroup = document.createElement('div');
      categoryGroup.classList.add('cert-category-group');
      categoryGroup.dataset.category = categoryKey;
      if (index !== 0) categoryGroup.hidden = true;

      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = categoryIndex.title;
      categoryGroup.appendChild(categoryTitle);
      divCertificaciones?.appendChild(categoryGroup);

      Object.entries(categoryIndex.primary ?? {}).forEach(
        ([key, certificationIndexItem]) => {
          createResourceCard({
            key,
            textItem: appData.certifications?.items?.[key],
            indexItem: certificationIndexItem,
            container: categoryGroup,
            buttonText: appData.certifications?.buttons?.open,
            dataAttribute: 'certification',
          });
        },
      );

      Object.entries(categoryIndex.secondary ?? {}).forEach(
        ([key, certificationIndexItem]) => {
          createResourceCard({
            key,
            textItem: appData.certifications?.items?.[key],
            indexItem: certificationIndexItem,
            container: categoryGroup,
            buttonText: appData.certifications?.buttons?.open,
            secondary: true,
            dataAttribute: 'certification',
          });
        },
      );
    },
  );

  const skills = document.querySelector('.skills-list');
  const skillsTitle = document.createElement('h2');
  skillsTitle.textContent = appData.menu?.skills ?? '';
  skills?.insertAdjacentElement('beforebegin', skillsTitle);

  Object.entries(appIndex.skills ?? {}).forEach(([key, skillIndexItem]) => {
    const skillText = appData.skills?.[key];
    if (!skillText) return;

    const li = document.createElement('li');
    const divContainer = document.createElement('div');
    divContainer.classList.add('skill-container');

    const img = document.createElement('img');
    img.classList.add('tech');
    img.src = `${baseUrl}/${skillIndexItem.src}`;
    img.alt = skillText.title;

    const span = document.createElement('span');
    span.classList.add('skill-name');
    span.textContent = skillText.title;

    const divProgressBar = document.createElement('div');
    divProgressBar.classList.add('progress-bar');

    const divProgress = document.createElement('div');
    divProgress.classList.add('progress');
    divProgress.style.width = skillIndexItem.progress;

    skills?.appendChild(li);
    li.appendChild(divContainer);
    divContainer.appendChild(img);
    divContainer.appendChild(span);
    li.appendChild(divProgressBar);
    divProgressBar.appendChild(divProgress);
  });

  const timeOutSkills = setTimeout(() => {
    const skillsSection = document.querySelector('#seccion-skills');
    if (skillsSection) skillsSection.style.visibility = 'visible';
    clearTimeout(timeOutSkills);
  }, 1000);

  window.$secondaryProjects = document.querySelectorAll(
    '#proyectos > .card.secondary',
  );
  window.$secondaryOdysseys = document.querySelectorAll(
    '#odysseys > .card.secondary',
  );
  window.$secondaryCerts = document.querySelectorAll(
    '#certificaciones .card.secondary',
  );
  window.dispatchEvent(new Event('resourcesLoaded'));
};
