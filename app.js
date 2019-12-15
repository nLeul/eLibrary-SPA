<<<<<<< HEAD
/* eslint-disable require-jsdoc */
/* eslint-disable strict */
document.getElementById()
function fetchFortext() {
    fetch("text/About.txt")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("outlet").innerHTML = data;

        });
=======
function renderPage(template, node) {
    node.innerHtml = template;
}
function fetchAboutText() {
    fetch()
>>>>>>> origin
}