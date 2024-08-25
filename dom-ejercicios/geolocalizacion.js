export default function getGeolocation(id) {
    const $id = document.getElementById(id),
        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

    const success = position => {
        let coords = position.coords;
        $id.innerHTML = `
        <p>Tu posición actual es:</p>
        <ul>
            <li>Latitud: <b>${coords.latitude}</b></li>
            <li>Longitud: <b>${coords.longitude}</b></li>
            <li>Precisión: <b>${coords.accuracy}</b> metros</li>
        </ul>
        <a href="http://www.google.com/maps/@${coords.latitude},${coords.longitude},17z" target="_blank" rel="noopener">Ver en Google Maps</a>
        `;
    };
    const error = err => {
        $id.innerHMTL = `<p><mark>Error ${err.code}: ${err.message}</mark></p>`;
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

}