
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


// fetch book

const booksNode = document.getElementById('booksID');
booksNode.addEventListener('click', fetchBook);
let table = '';
async function fetchBook() {
  const resp = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list");
  const data = await resp.json();

  table = ` 
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
        <td ><a data-toggle="modal" onclick="deleteBook(${element.bookId})" href="#confirmDeleteBookModal" data-bookId=${element.bookId} 
          data-title=${element.title} data-isbn=${element.isbn}" class="btn btn-primary">Delete</a><td>
        </tr>`
    count++
    outlet.innerHTML = table;
  });

  let delButtons = document.querySelectorAll('.deleteBtn');
  document.querySelector("#addbookId").addEventListener("click", addBooks)


}

//set index page 

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
fetchIndex();

// edit book page template 
let editBook = `  <div class="container">
<h3>Edit Book </h3>
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
<input id="saveBook" onclick="editBookAdded()" type="button" class="btn btn-primary" value="Edit Book">
    
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
  alert(bookId);
  // editBookAdded(event);
  let bookJson = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${bookId}`);
  let books = await bookJson.json();
  document.querySelector('#bookId').value = `${books.bookId}`;
  document.querySelector('#title').value = `${books.title}`;
  document.querySelector('#isbn').value = `${books.isbn}`;
  document.querySelector('#publisherid').value = `${books.publisher}`;
  document.querySelector('#overdueFeeid').value = `${books.overdueFee}`;
  document.querySelector('#datePublishedid').value = `${books.datePublished}`;
  // editBookAdded()
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


  alert("edit succesful");


}


//add book


const url = `https://elibraryrestapi.herokuapp.com/elibrary/api/book/add`;

function addBooks() {
  outlet.innerHTML = addBook;
}
async function saveAdded() {
  const data = {
    "isbn": document.querySelector("#isbn").value,
    "title": document.querySelector("#title").value,
    "overdueFee": document.querySelector("#overdueFeeid").value,
    "publisher": document.querySelector("#publisherid").value,
    "datePublished": document.querySelector("#datePublishedid").value
  };
  console.log(data)
  const response = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();


  alert("post succesful");

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

    bookId = $(event.relatedTarget).data("bookId");

    const bookISBN = $(event.relatedTarget).data("isbn");
    const bookTitle = $(event.relatedTarget).data("title");

    $(this).find("#deleteModalBookISBN").text("ISBN:" + bookISBN);
    $(this).find("#deleteModalBookTitle").text("Book Title: " + bookTitle);

    $("#deleteModalBtnYes").on("click", async function () {

      await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`,
        {
          method: "delete"
        })
      fetchBook()
    })
  })

}