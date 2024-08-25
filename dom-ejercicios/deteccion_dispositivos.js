export default function userDeviceInfo(id) {
    const $id = document.getElementById(id);
    const isMobile = {
        android: () => navigator.userAgent.match(/android/i),
        ios: () => navigator.userAgent.match(/iphone|ipod|ipad/i),
        windows: () => navigator.userAgent.match(/windows phone/i),
        any: function () {
            return this.android() || this.ios() || this.windows();
        },
    };
    const isDesktop = {
        linux: () => navigator.userAgent.match(/linux/i),
        mac: () => navigator.userAgent.match(/mac os/i),
        windows: () => navigator.userAgent.match(/windows nt/i),
        any: function () {
            return this.linux() || this.mac() || this.windows();
        },
    };
    const isBrowser = {
        chrome: () => navigator.userAgent.match(/chrome/i),
        safari: () => navigator.userAgent.match(/safari/i),
        firefox: () => navigator.userAgent.match(/firefox/i),
        opera: () => navigator.userAgent.match(/opera|opera mini/i),
        ie: () => navigator.userAgent.match(/msie|iemobile/i),
        edge: () => navigator.userAgent.match(/edge/i),
        any: function () {
            return (
                this.ie() ||
                this.edge() ||
                this.chrome() ||
                this.safari() ||
                this.firefox() ||
                this.opera()
            );
        },
    };
    $id.innerHTML = `
    <ul>
        <li>User Agent: <b>${navigator.userAgent}</b></li>
        <li>Plataforma: <b>${isMobile.any() ? isMobile.any() : isDesktop.any()}</b></li>
        <li>Navegador: <b>${isBrowser.any()}</b></li>
    </ul>
    `;

    if (isBrowser.chrome()) {
      $id.innerHTML += `<p><mark>Este contenido solo se ve en Chrome</mark><p>`;
    }

    if (isBrowser.firefox()) {
      $id.innerHTML += `<p><mark>Este contenido solo se ve en Firefox</mark><p>`;
    }

    if (isDesktop.linux()) {
      $id.innerHTML += `<p><mark>Descarga nuestro software para Linux</mark><p>`;
    }

    if (isDesktop.mac()) {
      $id.innerHTML += `<p><mark>Descarga nuestro software para Mac OS</mark><p>`;
    }

    if (isDesktop.windows()) {
      $id.innerHTML += `<p><mark>Descarga nuestro software para Windows</mark><p>`;
    }

    //REDIRECCIONES: En el caso que quisiera mandar al sitio versión móvil como por ej hacen en facebook "m.facebook.com"
    // if (isMobile.android()) {
    //   window.location.href = "https://translate.google.com.ar/?hl=es&sl=en&tl=es&text=This%20is%20the%20mobile%20version%20of%20the%20site%20(known%20as%20%22m.yoursite.com%22)&op=translate";
    // }


  };