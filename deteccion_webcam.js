export default function webCam(id) {
    const $video = document.getElementById(id);

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
            $video.srcObject = stream;
            $video.play();
        }).catch(err => {
            $video.insertAdjacentHTML("beforebegin", `<p>Sucedió el siguiente error!: <mark>${err}</mark></p>`);

        });
    }
}