
let x = 0, y = 0;
export function moveBall(e, ball, stage) {
    const $ball = document.querySelector(ball),
        $stage = document.querySelector(stage),
        limitsBall = $ball.getBoundingClientRect(),
        limitsStage = $stage.getBoundingClientRect();
    // console.log(e.keyCode);
    // console.log(e.key);


    switch (e.keyCode) {
        case 37:
            if (limitsBall.left > limitsStage.left) {
                e.preventDefault();
                x--;
            }
            break;
        case 38:
            if (limitsBall.top > limitsStage.top) {
                e.preventDefault();
                y--;
            }
            break;
        case 39:
            if (limitsBall.right < limitsStage.right) {
                e.preventDefault();
                x++;
            }
            break;
        case 40:
            if (limitsBall.bottom < limitsStage.bottom) {
                e.preventDefault();
                y++;
            }
            break;

        default:
            break;
    }
    $ball.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
}

export function shortcuts(e) {
    // console.log(e);

    if (e.key === "a" && e.altKey) {
        alert("Has lanzado una alerta con el teclado");
    }
    if (e.key === "c" && e.altKey) {
        confirm("Has lanzado una confirmación con el teclado");
    }
    if (e.key === "p" && e.altKey) {
        prompt("Has lanzado un aviso con el teclado");
    }

}