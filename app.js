const index = `<img src="image/banner1.png" alt="panoramic" >`
const virtual = `<img src="image/panoramic.png" alt="panoramic" >`
let mytable = `<h3>Books in our Collection </h3>
<span id="btdisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >Book deleted Successfully</span>
<a type="button" onclick= "addbook()" id="addbooks" class="btn btn-success" style="float:right;">Add Books</a>
`
let newbook = `<h2>New Book Form <span id="pbtdisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >Book added Successfully</span> </h2>
`
let editbook = `<h2>Editing Book Form</h2>`
let addbooks = `
            <div class="col-md-16 mb-3">
                <label for="exampl">*required form fields</label><br>
                <label for="title">*Book Titles</label>
                <input type="text" class="form-control" id="title" aria-describedby="titleHelp"
                    placeholder="Enter Titles" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">

                    <label for="isbn">*ISBN</label>
                    <input type="isbn" class="form-control" id="isbn" aria-describedby="isbnHelp"
                        placeholder="Enter isbn">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="Overdue">*Overdue per Pay</label>
                    <input type="text" class="form-control" id="Overdue" aria-describedby="OverduebnHelp"
                        placeholder="Enter Overdue " required>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">

                    <label for="Publisher">*Publisher</label>
                    <input type="text" class="form-control" id="publisher" aria-describedby="PublisherbnHelp"
                        placeholder="Enter Publisher" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="date">*Date Published</label>
                    <input type="date" class="form-control" id="date" aria-describedby="isbnHelp"
                        placeholder="Enter Date Published" required>
                </div>
            </div>
            <div>
                <span style="float:right;">
                    <div class="btn-group mr-2" role="group" aria-label="Second group">

                        <button type="reset" class="btn btn-success">Reset</button>
                    </div>
                    <div class="btn-group" role="group" aria-label="Third group">
                        <button type="button" onclick="postbook()" id="save" class="btn btn-primary">Save Book</button>
                    </div>
                </span>

            </div>
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
    output =
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
    <th scope="col"><a href="#" onclick="editbooks()"?bookId=${element.bookId}>Edit</a></th>
    <td><a data-toggle="modal" data-bookid="${element.bookId}" data-bookisbn="${element.isbn}" 
    data-booktitle="${element.title}" href="#confirmDeleteBookModal">Delete</a></td>
              </tr>`
            })
            outlet.innerHTML = mytable + output;
        });
}
const bookbtn = document.getElementById("booksID");
bookbtn.addEventListener("click", getbook)

function addbook() {

    outlet.innerHTML = newbook + addbooks;
};
function editbooks() {

    outlet.innerHTML = editbook + addbooks;
};


async function postbook() {

    //let bookId= document.getElementById("bookId").value;
    let Title = document.getElementById("title").value;
    let IsBn = document.getElementById("isbn").value;
    let publisher = document.getElementById("publisher").value;
    let overdueFee = Number(document.getElementById("Overdue").value);
    let dateP = document.getElementById("date").value;

    let data = {
        // "bookId":bookId,
        "isbn": IsBn,
        "title": Title,
        "overdueFee": overdueFee,
        "publisher": publisher,
        "datePublished": dateP
    }
    //console.log(data);

    const resp = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let dis = document.getElementById("pbtdisplay");
    dis.style.display = "block";
    setTimeout(_ => {
        location.replace( outlet.innerHTML = mytable + output)
    }, 3000)
getbook()
};
