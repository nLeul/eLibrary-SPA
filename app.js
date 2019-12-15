
const aboutNode = document.getElementById('aboutID');
aboutNode.addEventListener('click', fetchAboutText);
const outlet = document.getElementById("outlet");

function fetchAboutText() {
    fetch('./text/About.txt')
        .then(res => res.text())
        .then(data => {
            console.log(data);
            outlet.innerHTML = data;

        })
}

const virtualTour = document.getElementById('virtualID');
virtualTour.addEventListener('click', fetchVirtualTour);

function fetchVirtualTour() {
    let image = `<img src="./image/panoramic.png" alt="library virtual tour" ">`
    fetch('./text/VirtualTour.txt')
        .then(res => res.text())
        .then(data => {
            console.log(data);
            outlet.innerHTML = `${image}${data}`;

        })
}

const booksNode = document.getElementById('booksID');
booksNode.addEventListener('click', fetchBook);

async function fetchBook() {
    const resp = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list");
    const data = await resp.json();

    let table = `
    <table class="table table-hover">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">ISBN</th>
    <th scope="col">BOOK TITLE</th>
    <th scope="col">OVERDUE FEE</th>
    <th scope="col">PUBLISHER</th>
    <th scope="col">DATE PUBLISHED</th>
    </tr>
    </thead>`
    let count = 1;
    data.forEach(element => {

        table += `<tr>
        <td>${count}</td>
        <td>${element.isbn}</td>
        <td>${element.title}</td>
        <td>${element.overdueFee}</td>
        <td>${element.publisher}</td>
        <td>${element.datePublished}</td>
        </tr>`
        count++
        outlet.innerHTML = table;
    });
}

const indexPage = document.querySelector('.navbar-brand');
indexPage.addEventListener('click', fetchIndex);

function fetchIndex() {
    let image = `<img src="./image/banner1.png" alt="library banner" >`
    fetch('./text/Indext.txt')
        .then(res => res.text())
        .then(data => {
            console.log(data);
            outlet.innerHTML = `${image}${data}`;

        })
}
fetchIndex()





