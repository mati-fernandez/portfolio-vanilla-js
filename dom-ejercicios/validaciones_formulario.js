export default function contactFormValidations () {
    const $form = document.querySelector(".contact-form"),
        $inputs = document.querySelectorAll(".contact-form [required]");
    
    $inputs.forEach(input => {
        const $span = document.createElement("span");
        $span.id =input.name;
        $span.textContent = input.title;
        $span.classList.add("contact-form-error", "none");
        input.insertAdjacentElement("afterend", $span);
    });

    document.addEventListener("keyup", e => {
        if (e.target.matches(".contact-form [required]")) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern; 

                if (pattern && $input.value !=="") {
                    let regex = new RegExp(pattern);
                    return !regex.exec($input.value)?document.getElementById($input.name).classList.add("is-active"):document.getElementById($input.name).classList.remove("is-active");
                }
                if(!pattern) {
                    return $input.value === ""?document.getElementById($input.name).classList.add("is-active"):document.getElementById($input.name).classList.remove("is-active")
                }
        }
    });

    document.addEventListener("submit", e => {
        e.preventDefault();
        // alert("Enviando Formulario");

        const $loader = document.querySelector(".contact-form-loader"),
            $response = document.querySelector(".contact-form-response");

        $loader.classList.remove("none");

        setTimeout(()=> {
            $loader.classList.add("none");
            $response.classList.remove("none");
            setTimeout(() => {
                $form.submit();
                $form.reset();
                $response.classList.add("none");
            },3000);
        }, 2500);
    });
}