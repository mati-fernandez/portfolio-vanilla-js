export default function responsiveTester(form) {
    const $form = document.getElementById(form);
    let tester;

    document.addEventListener("submit", (e) => {
        if (e.target === $form) {
            e.preventDefault();
            // alert("Formulario enviado");
            tester = window.open(
                $form.direccion.value,
                "tester",
                `innerWidth=${$form.ancho.value}, innerHeight=${$form.alto.value}`
            );
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target === $form.cerrar) {
            tester.close();
            // e.preventDefault();
        }
    });
}