document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");
    const contentDiv = document.getElementById("content");

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
                window.history.pushState({ path: url }, "", url); // Update URL without reloading
            })
            .catch(error => console.error("Error loading page:", error));
    }

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("data-target");
            if (page) loadPage(page);
        });
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", function (event) {
        if (event.state && event.state.path) {
            loadPage(event.state.path);
        }
    });
});
