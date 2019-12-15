const index = `<img src="image/banner1.png" alt="panoramic" >`
const virtual = `<img src="image/panoramic.png" alt="panoramic" >`
let mytable = `<h3>Books in our Collection </h3>
<span id="btdisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >Book deleted Successfully</span>
<a type="button" href="#" class="btn btn-success" style="float:right;">Add Books</a>
`



const outlet = document.getElementById("outlet");

function aboutPage() {

    fetch("text/About.txt")
        .then((reponse) => reponse.text())
        .then((data) => {
            outlet.innerHTML = data;
        })
};
const about = document.getElementById("aboutID");
about.addEventListener("click", aboutPage)

function virtualPage() {

    fetch("text/VirtualTour.txt")
        .then((reponse) => reponse.text())
        .then((data) => {
            outlet.innerHTML = virtual + data;
        })
};
const virtualbtn = document.getElementById("virtualID");
virtualbtn.addEventListener("click", virtualPage)


function msdPage() {
    fetch("text/Indext.txt")
        .then((reponse) => reponse.text())
        .then((data) => {
            outlet.innerHTML = index + data;
        })
};
msdPage()

const indexbtn = document.getElementById("indexID");
indexbtn.addEventListener("click", msdPage)

let output = "";
function getbook() {
    output=
   `<table class="table table-hover">
   <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">ISBN</th>
            <th scope="col">Book Tittle</th>
            <th scope="col">Overdue Fee</th>
            <th scope="col">Publisher</th>
            <th scope="col">Date Published</th>
        </tr>
    </thead>
    `

    fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
        .then((resp) => resp.json())
        .then((data) => {

            data.forEach(element => {
                output += `<tr>
    <th scope="col">${element.bookId}</th>
    <th scope="col"> ${element.isbn}</th>
    <th scope="col">${element.title}</th>
    <th scope="col">${element.overdueFee}</th>
    <th scope="col">${element.publisher}</th>
    <th scope="col">${element.datePublished}</th>
    <th scope="col"><a href=editingBook.html?bookId=${element.bookId}>Edit</a></th>
    <td><a data-toggle="modal" data-bookid="${element.bookId}" data-bookisbn="${element.isbn}" 
    data-booktitle="${element.title}" href="#confirmDeleteBookModal">Delete</a></td>
              </tr>`
            })
            outlet.innerHTML = mytable + output;
        });  
}
const bookbtn = document.getElementById("booksID");
bookbtn.addEventListener("click", getbook)