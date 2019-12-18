
const aboutNode = document.getElementById('aboutID');
aboutNode.addEventListener('click', fetchAboutText);
const outlet = document.getElementById("outlet");

let addDisplay = `<h2><span id="pbtdisplay" class="btn btn-success" 
style="display: none; margin-left: 400px; margin-right: 400px;" >Book added Successfully</span> </h2>`


function fetchAboutText() {

  let myHeader = `<h5>About us</h5>`
  let image = `<img width="1100" height="250"src="./image/topicals.png" alt="library virtual tour" ">`
  fetch('./text/About.txt')
    .then(res => res.text())
    .then(data => {

      outlet.innerHTML = `${myHeader}${image}${data}`;


    })
}

const virtualTour = document.getElementById('virtualID');
virtualTour.addEventListener('click', fetchVirtualTour);

function fetchVirtualTour() {
  let image = `<img src="./image/panoramic.png" alt="library virtual tour" ">`
  fetch('./text/VirtualTour.txt')
    .then(res => res.text())
    .then(data => {

      outlet.innerHTML = `${image}${data}`;


    })
}


// fetch book
let myBook = [];
const booksNode = document.getElementById('booksID');
booksNode.addEventListener('click', fetchBook);
let table = '';
async function fetchBook() {
  const resp = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list");
  const data = await resp.json();
  tabeleDraw(data)
}
function tabeleDraw(data) {
  myBook.push(data);
  table = ` 
  <h2><span id="deleteDisp" class="btn btn-success" 
style="display: none; margin-left: 400px; margin-right: 400px;" >DELETED Successfully</span> </h2>
    <div class="row">
    <div class="col"><h3>Our Book Collection</h3></div>
    </div>
    <div class="row">
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"> <button style="margin-left:1000px;" id="addbookId"class="btn btn-primary">Add Book</button></div>
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
        <td class="editBtn"><a  onclick="editBooks(${element.bookId})" href="#.?bookId=${element.bookId}" class="btn btn-primary">Edit</a><td>
        <td ><a data-toggle="modal" onclick="deleteBook(${element.bookId})" href="#confirmDeleteBookModal" data-bookid=${element.bookId} 
          data-title=${element.title} data-isbn=${element.isbn} class="btn btn-danger">Delete</a><td>
        </tr>`
    count++
    outlet.innerHTML = table;
  });

  let delButtons = document.querySelectorAll('.deleteBtn');
  document.querySelector("#addbookId").addEventListener("click", addBooks)


}
console.log(myBook)


//set index page 

const indexPage = document.querySelector('#indexPage');
indexPage.addEventListener('click', fetchIndex);

function fetchIndex() {
  let image = `<img src="./image/banner1.png" alt="library banner" >`
  let topTitle = ` <h4>Welcome to the eLibrary®</h4>`
  fetch('./text/Indext.txt')
    .then(res => res.text())
    .then(data => {

      outlet.innerHTML = ` ${topTitle}${image}${data}`;


    })
}
// fetchIndex();

// edit book page template 
let editBook = `  <div class="container">
<h3>Edit Book </h3>
<h2><span id="updateDisp" class="btn btn-success" 
style="display: none; margin-left: 400px; margin-right: 400px;" >Updated Successfully</span> </h2>
<form>
  <fieldset>
  <div class="form-group">
  <input type="hidden" class="form-control" id="bookId" >
    <div class="form-group">
      <label for="title">Book Title</Title></label>
      <input type="text" class="form-control" id="title" >
      
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="isbn">ISBN</label>
        <input type="text" class="form-control" id="isbn">
      </div>
      <div class="col-md-6">
        <label for="publisherid"">Publisher</label>
        <input type="text" class="form-control" id="publisherid">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="overdueFeeid">Overdue Fee Per Day</label>
        <input type="number" class="form-control" id="overdueFeeid" placeholder="0.00">
      </div>
      <div class="col-md-6">
        <label for="datePublishedid">Date Published</label>
        <input type="date" class="form-control" id="datePublishedid" placeholder="yyyy-mm-dd">
      </div>
    </div>
</div>
</fieldset>
<div id="button" style="margin-left: 1020px;">
<input id="saveBook" onclick="editBookAdded()" type="button" class="btn btn-primary" value="UpdateBook">
    
</div>`


// add book page template 
let addBook = `  <div class="container">
<h3>Add Book </h3>
<form>
  <fieldset>
    <div class="form-group">
      <label for="title">Book Title</Title></label>
      <input type="text" class="form-control" id="title" >
      
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="isbn">ISBN</label>
        <input type="text" class="form-control" id="isbn">
      </div>
      <div class="col-md-6">
        <label for="publisherid"">Publisher</label>
        <input type="text" class="form-control" id="publisherid">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="overdueFeeid">Overdue Fee Per Day</label>
        <input type="number" class="form-control" id="overdueFeeid" placeholder="0.00">
      </div>
      <div class="col-md-6">
        <label for="datePublishedid">Date Published</label>
        <input type="date" class="form-control" id="datePublishedid" placeholder="yyyy-mm-dd">
      </div>
    </div>
</div>
</fieldset>
<div id="button" style="margin-left: 1020px;">
<input id="saveBook" onclick='saveAdded()' type="button" class="btn btn-primary" value="save">
    
</div>`



// edit books

async function editBooks(bookId) {

  outlet.innerHTML = editBook;


  let bookJson = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${bookId}`);
  let books = await bookJson.json();
  document.querySelector('#bookId').value = `${books.bookId}`;
  document.querySelector('#title').value = `${books.title}`;
  document.querySelector('#isbn').value = `${books.isbn}`;
  document.querySelector('#publisherid').value = `${books.publisher}`;
  document.querySelector('#overdueFeeid').value = `${books.overdueFee}`;
  document.querySelector('#datePublishedid').value = `${books.datePublished}`;

  document.querySelector('#saveBook').addEventListener('click', editBookAdded)
}

async function editBookAdded() {


  const bookId = document.querySelector('#bookId').value
  const data = {
    "isbn": document.querySelector("#isbn").value,
    "title": document.querySelector("#title").value,
    "overdueFee": document.querySelector("#overdueFeeid").value,
    "publisher": document.querySelector("#publisherid").value,
    "datePublished": document.querySelector("#datePublishedid").value
  };
  console.log(data)
  const response = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  document.querySelector("#updateDisp").style.display = 'block';
  setTimeout(() => {
    fetchBook();
  }, 3000)

}


//add book


const url = `https://elibraryrestapi.herokuapp.com/elibrary/api/book/add`;

function addBooks() {
  outlet.innerHTML = addDisplay + addBook;
}
async function saveAdded() {
  const data = {
    "isbn": document.querySelector("#isbn").value,
    "title": document.querySelector("#title").value,
    "overdueFee": document.querySelector("#overdueFeeid").value,
    "publisher": document.querySelector("#publisherid").value,
    "datePublished": document.querySelector("#datePublishedid").value
  };

  const response = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();


  setTimeout(_ => {
    let addBookDis = document.querySelector('#pbtdisplay')
    addBookDis.style.display = 'block';

  })
  fetchBook() // alert("post succesful");

}

let modalView = `<div class="modal fade" id="confirmDeleteBookModal" tabindex="-1" role="dialog"
aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Confirm Delete</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p><b>Are you sure you wish to delete this book?</b></p>
            <br />
            <p id="deleteModalBookISBN"></p>
            <p id="deleteModalBookTitle"></p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">No</button>
            <input type="hidden" id="bookId">
            <button deleteBook(bookId) id="deleteModalBtnYes" data-dismiss="modal" type="button" class="btn btn-danger">delete</button>
        </div>
    </div>
</div>
</div>`

function deleteBook(bookId) {
  outlet.innerHTML = modalView + table;


  $("#confirmDeleteBookModal").on("show.bs.modal", function (event) {

    const bookId = $(event.relatedTarget).data("bookid");

    const bookISBN = $(event.relatedTarget).data("isbn");
    const bookTitle = $(event.relatedTarget).data("title");

    $(this).find(".modal-body #deleteModalBookISBN").text("ISBN:" + bookISBN);
    $(this).find(".modal-body #deleteModalBookTitle").text("Book Title: " + bookTitle);

    $("#deleteModalBtnYes").click(async function () {

      await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`,
        {
          method: "DELETE"
        })
      document.querySelector("#deleteDisp").style.display = 'block';
      setTimeout(() => {
        fetchBook();
      }, 3000)

    })
  })

}


document.querySelector('#searchID').addEventListener("click", searchWithTitle);

function searchWithTitle() {

  let resultBook = [];
  let bookTitle = document.querySelector('#searchValue').value;
  for (let book of myBook) {
    if (book.title === bookTitle) {
      resultBook.push(book.title);

    }
  }
  console.log(resultBook)
  // tabeleDraw(resultBook);
}
