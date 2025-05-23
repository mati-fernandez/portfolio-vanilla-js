export default function draw(btn, selector) {
    const getWinner = (selector) => {
        const $players = document.querySelectorAll(selector),
            random = Math.floor(Math.random() * $players.length),
            winner = $players[random];
        return `El ganador es: ${winner.textContent}`;
    };
    document.addEventListener("click", e => {
        if (e.target.matches(btn)) {
            let result = getWinner(selector);
            alert(result);
        }
    });
}