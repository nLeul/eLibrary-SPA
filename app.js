
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
    <div class="row">
    <div class="col"><h3>Our Book Collection</h3></div>
    </div>
    <div class="row">
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"></div>
    <div class="col"> <button style="margin-left:1000px;"class="btn btn-primary">Add Book</button></div>
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
        <td class="editBtn"><a href="?bookId=${element.bookId}"class="btn btn-primary">Edit</a><td>
        <td class="deleteBtn"><a href="#Modal" class="btn btn-primary" data-toggle="modal" data-bookid=${element.bookId}
         data-isbn=${element.isbn} data-title=${element.title} data-overdueFee=${element.overdueFee} data-publisher=${element.publisher} >Delete</a><td>
        </tr>`
        count++
        outlet.innerHTML = table;
    });
    let buttons = document.querySelectorAll('.editBtn');
    buttons.forEach(button => {
        button.addEventListener('click', editBook);
    })
    let delButtons = document.querySelectorAll('.deleteBtn');
    delButtons.forEach(button => {
        button.addEventListener('click', deleteBook);
    })

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
fetchIndex();

let addBook = `  <div class="container">
<h3>Edit Book </h3>
<form>
  <fieldset>
    <div class="form-group">
      <label for="exampleInputEmail1">Book Title</Title></label>
      <input type="text" class="form-control" id="titleid" >
      
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="exampleInputPassword1">ISBN</label>
        <input type="text" class="form-control" id="ibnid">
      </div>
      <div class="col-md-6">
        <label for="exampleInputPassword1">Publisher</label>
        <input type="text" class="form-control" id="publisherid">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <label for="exampleInputPassword1">Overdue Fee Per Day</label>
        <input type="number" class="form-control" id="overdueFeeid" placeholder="0.00">
      </div>
      <div class="col-md-6">
        <label for="exampleInputPassword1">Date Published</label>
        <input type="date" class="form-control" id="datePublishedid" placeholder="yyyy-mm-dd">
      </div>
    </div>
</div>
</fieldset>
<div id="button" style="margin-left: 1020px;">
<input id="postBook" type="button" class="btn btn-primary" value="Edit Book">
    
</div>`

// <td><a href="editbook.html?bookId=${element.bookId}"class="btn btn-primary">Edit</a><td>

function editBook(e) {
    outlet.innerHTML = addBook;
    e.preventDefault();
}
function deleteBook() {
    // outlet.innerHTML = addBook;
    alert("delete")
}



