export default function networkStatus() {
    const isOnline = () => {
        const $div = document.createElement("div");

        if (navigator.onLine) {
            $div.textContent = "Conexión Restablecida";
            $div.classList.add("online");
            $div.classList.remove("offline");
        } else {
            $div.textContent = "Conexión Perdida";
            $div.classList.add("offline");
            $div.classList.remove("online");
        }

        document.body.insertAdjacentElement("afterbegin", $div);
        setTimeout(() => document.body.removeChild($div), 2000);
    };

    window.addEventListener("online", (e) => isOnline());
    window.addEventListener("offline", (e) => isOnline());
}