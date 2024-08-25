export default function scrollSpy() {
    const $sections = document.querySelectorAll("section[data-scroll-spy]");

    const cb = (entries) => {

        entries.forEach(entry => {
            const id = entry.target.getAttribute("id");
            if (entry.isIntersecting) {
                document.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.add("active");
            } else {
                document.querySelector(`a[data-scroll-spy][href="#${id}"]`).classList.remove("active");
            }
        });
    };

    const observer = new IntersectionObserver(cb, {
        // root
        // rootMargin: "-250px",
        threshold: [.3, .75] //min y max pero tambien se puede pasar un solo valor
    });

    $sections.forEach(el => observer.observe(el));
}