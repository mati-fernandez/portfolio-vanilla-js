import scrollTopButton from './boton_scroll.js';
import countdown from './cuenta_regresiva.js';
import userDeviceInfo from './deteccion_dispositivos.js';
import networkStatus from './deteccion_red.js';
import webCam from './deteccion_webcam.js';
import searchFilters from './filtro_busquedas.js';
import getGeolocation from './geolocalizacion.js';
import hamburgerMenu from './hamburguesa.js';
import speachReader from './narrador.js';
import responsiveMedia from './objeto_responsive.js';
import responsiveTester from './prueba_responsive.js';
import { digitalCLock, alarm } from './reloj.js';
import scrollSpy from './scroll_espia.js';
import slider from './slider.js';
import draw from './sorteo.js';
import { moveBall, shortcuts } from './teclado.js';
import darkTheme from './tema_oscuro.js';
import contactFormValidations from './validaciones_formulario.js';
import smartVideo from './video_inteligente.js';

document.addEventListener('DOMContentLoaded', (e) => {
  hamburgerMenu('.panel-btn', '.panel', '.menu a');
  digitalCLock('#reloj', '#activar-reloj', '#desactivar-reloj');
  alarm('assets/alarma.mp3', '#activar-alarma', '#desactivar-alarma');
  countdown('countdown', 'Jan 01, 2025 00:00:00', 'Feliz Año Nuevo!');
  scrollTopButton('.scroll-top-btn'); //el video de youtube se supone va a cargar cuando el dominio sea publico. No admite localHost
  responsiveMedia(
    'youtube',
    '(min-width: 1024px)',
    `<a href="https://youtu.be/HVPzWkdhwrw?t=111" target="_blank" rel ="noopener">Ver Video<br><br></a>`,
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/HVPzWkdhwrw?start=111" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  );
  responsiveMedia(
    'gmaps',
    '(min-width: 1024px)',
    `<a href="https://goo.gl/maps/3mXzkbg6e9uthYCk6?coh=178572&entry=tt" target="_blank" rel ="noopener">Ver Mapa</a>`,
    `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13824.422808530984!2d31.1247115!3d29.9763921!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584f7de239bbcd%3A0xca7474355a6e368b!2sPir%C3%A1mides%20de%20Giza!5e0!3m2!1ses-419!2sar!4v1685065951593!5m2!1ses-419!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
  );
  responsiveTester('responsive-tester');
  userDeviceInfo('user-device');
  webCam('webcam');
  getGeolocation('geolocation');
  searchFilters('.card-filter', '.card');
  draw('#winner-btn', '.player');
  slider();
  scrollSpy();
  smartVideo();
  contactFormValidations();
});

document.addEventListener('keydown', (e) => {
  shortcuts(e);
  moveBall(e, '.ball', '.stage');
});

darkTheme('.dark-theme-btn', 'dark-mode');
networkStatus();
speachReader();
