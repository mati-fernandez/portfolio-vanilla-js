export function digitalCLock(clock, btnPlay, btnStop) {
    let clockTempo;
    document.addEventListener("click", (e) => {
        if (e.target.matches(btnPlay)) {
            clockTempo = setInterval(() => {
                let clockHour = new Date().toLocaleTimeString();
                document.querySelector(clock).innerHTML = `<h3>${clockHour}</h3>`;
            }, 1000);
            e.target.disabled = true;
        }

        if (e.target.matches(btnStop)) {
            clearInterval(clockTempo);
            document.querySelector(clock).innerHTML = `<h3>00:00:00</h3>`;
            document.querySelector(btnPlay).disabled = false;
        }
    })
}

export function alarm(sound, btnPlay, btnStop) {
    let alarmTempo;
    const $alarm = document.createElement("audio");
    $alarm.src = sound;
    document.addEventListener("click", (e) => {
        if (e.target.matches(btnPlay)) {
            alarmTempo = setTimeout(() => {
                $alarm.play();
            }, 1000);
            e.target.disabled = true;
        }

        if (e.target.matches(btnStop)) {
            clearTimeout(alarmTempo);
            $alarm.pause();
            $alarm.currentTime = 0;
            document.querySelector(btnPlay).disabled = false;
        }
    });
}