const homepageImage = `
<br>
<br>
<img class="rounded mx-auto d-block"   src="image/banner.jpg" alt="panoramic" height="400" width="1100">`
const virtualPageImage = `<img src="image/virtualtour.jpg" alt="panoramic" height="400" width="1100">`
let bookLists = `<h3>Books in our Collection </h3>
<button type="button" onclick= "addbook()" id="addbooks" class="btn btn-outline-primary" style="float:right;">Add Books</button>
`
let addNewBook = `<h2>New Book Form <span id="pbtdisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >
Book added Successfully</span> </h2>`
let editBook = `<h2>Edit Book Form<span id="btnEdit" class="btn btn-outline-success"
style="margin-left: 350px; margin-right: 350px; display: none;">Successfully book updated!</span></h2>`
let addNewBookForm = `<form onsubmit="addNewBookPost(event)">
            <div class="col-md-16 mb-3">
                <label for="example">*required form fields</label><br>
                <label for="title">*Book Titles</label>
                <input type="text" class="form-control" id="title" aria-describedby="titleHelp"
                    placeholder="Enter Titles" required>
            </div>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="isbn">*ISBN</label>
                    <input type="number" class="form-control" id="isbn" aria-describedby="isbnHelp"
                        placeholder="Enter isbn" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="Overdue">*Overdue per Pay</label>
                    <input type="number" class="form-control" id="Overdue" aria-describedby="OverduebnHelp"
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
                        <button type="submit"  id="save" class="btn btn-primary">Save Book</button>
                    </div>
                </span>
            </div>
            </form>
`
const outlet = document.getElementById("outlet");
/**
 * fetching aboutpage from the text file saved in text folder
 */
function aboutPage() {
    fetch("text/About.txt")
        .then((resp) => resp.text())
        .then((result) => {
            outlet.innerHTML = result;
        })

};

document.getElementById("aboutPageID").addEventListener("click", function () {
    history.pushState("aboutPage", "", "/aboutPage")
    aboutPage()
    event.preventDefault();

})

const aboutPageDisplay = document.getElementById("aboutPageID");
aboutPageDisplay.addEventListener("click", aboutPage)
/**
 * fetching virtual page from text folder
 */
function virtualPage(event) {
    fetch("text/VirtualTour.txt")
        .then((resp) => resp.text())
        .then((result) => {
            outlet.innerHTML = virtualPageImage + result;
        })
};
document.getElementById("virtualPageID").addEventListener("click", function () {
    history.pushState("virtualPage", "", "/virtualPage")
    virtualPage()
    event.preventDefault();
})
const virtualbtn = document.getElementById("virtualPageID");
virtualbtn.addEventListener("click", virtualPage)
/**
 * injecting the homepage 
 */
function mainPageDisplay() {
    fetch("text/Indext.txt")
        .then((resp) => resp.text())
        .then((result) => {
            outlet.innerHTML = homepageImage + result;
        })
};
document.getElementById("indexID").addEventListener("click", function () {
    history.pushState("home", "", "index")
    mainPageDisplay();
    event.preventDefault()
})
mainPageDisplay();

const mainPage = document.getElementById("indexID");
mainPage.addEventListener("click", mainPageDisplay)

let outputList = "";
/**fetching books from the server and presenting them in tables in the books page
 */
function BookList() {
    fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
        .then((resp) => resp.json())
        .then((data) => {
            fetchBookList(data)
        })
}
// let outputList = "";
function fetchBookList(array) {
    outputList =
        `<span id="deletebtn" class="btn btn-outline-primary" style="display: none; 
        margin-left: 400px; margin-right: 400px;" >Book deleted Successfully</span>
        <table class="table table-hover">
   <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">ISBN</th>
            <th scope="col">Book Tittle</th>
            <th scope="col">Overdue Fee</th>
            <th scope="col">Publisher</th>
            <th scope="col">Date Published</th>
        </tr>
    </thead>`


    array.forEach((element) => {
        outputList += `<tr>
    <td scope="col">${element.bookId}</td>
    <td scope="col"> ${element.isbn}</td>
    <td scope="col">${element.title}</td>
    <td scope="col">${element.overdueFee}</td>
    <td scope="col">${element.publisher}</td>
    <td scope="col">${element.datePublished}</td>
    <td scope="col"><a href="#" onclick="getBookByID(${element.bookId})" ?bookId=${element.bookId}>Edit</a></td>
    <td scope="col"><a data-toggle="modal" href="#confirmDeleteBookModal" data-bookid="${element.bookId}" 
                       data-bookisbn="${element.isbn}" data-booktitle="${element.title}" onclick="deleteBook()">Delete</a></td>
              </tr>`
    })
    outlet.innerHTML = bookLists + outputList;
};

document.getElementById("booksID").addEventListener("click", function () {
    history.pushState("books", "", "/books")
    fetchBookList()
    event.preventDefault()
})
const bookNavBtn = document.getElementById("booksID");
bookNavBtn.addEventListener("click", BookList)
/**
 * injecting add new book form 
 */
function addbook() {
    outlet.innerHTML = addNewBook + addNewBookForm;
};
/**
 * @param  {string} event some event will be passed to prevent the default behaviour
 * @returns none
 * the function accepts book information form the user and saves them in the server
 * and displays the book is added successfully message to the user
 */
async function addNewBookPost(event) {
    event.preventDefault();
    let Title = document.getElementById("title").value;
    let IsBn = document.getElementById("isbn").value;
    let publisher = document.getElementById("publisher").value;
    let overdueFee = Number(document.getElementById("Overdue").value);
    let dateP = document.getElementById("date").value;
    let data = {
        "isbn": IsBn,
        "title": Title,
        "overdueFee": overdueFee,
        "publisher": publisher,
        "datePublished": dateP
    }
    //  console.log(data);

    const resp = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let bookAddedDisplay = document.getElementById("pbtdisplay");
    bookAddedDisplay.style.display = "block";
    setTimeout(_ => {
        fetchBookList()
    }, 1000)
};

let editBookForm = `<form  >
                <div class="col-md-16 mb-3">
                    <label for="example">*required form fields</label><br>
                    <label for="title">*Book Titles</label>
                    <input type="text" class="form-control" id="title" aria-describedby="titleHelp"
                        placeholder="Enter Titles" required>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="isbn">*ISBN</label>
                        <input type="number" class="form-control" id="isbn" aria-describedby="isbnHelp"
                            placeholder="Enter isbn" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="Overdue">*Overdue per Pay</label>
                        <input type="number" class="form-control" id="Overdue" aria-describedby="OverduebnHelp"
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
                        <input type="hidden" id="bookhiddenId">
                            <button onclick="updateBookHandler()" type="button" id="editsave" class="btn btn-primary">Save Book</button>
                        </div>
                    </span>
                </div>
            </form>`

/**
 * @param  {number} bookId the id of the book selected to be edited
 * @returns none 
 * the function populates the date to the respective input place in the input tags by fetching 
 * the book information from the server
 */
async function getBookByID(bookId) {
    outlet.innerHTML = editBook + editBookForm;
    console.log(bookId)
    let url = `https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${bookId}`;
    let response = await fetch(url, {
        method: "GET"
    })
    let jasonobj = await response.json()
    document.getElementById("bookhiddenId").value = jasonobj.bookId
    document.getElementById("title").value = jasonobj.title
    document.getElementById("isbn").value = jasonobj.isbn
    document.getElementById("Overdue").value = jasonobj.overdueFee
    document.getElementById("publisher").value = jasonobj.publisher
    document.getElementById("date").value = jasonobj.datePublished
}
/**
 * the function reads all book information after the user edits it and send them back to the server 
 * to update the initail information
 */
function updateBookHandler() {
    //debugger
    // event.preventDefault();
    let hiddenId = document.getElementById("bookhiddenId").value;
    let isbn = document.getElementById("isbn").value;
    let bookTitle = document.getElementById("title").value;
    let overDueFee = document.getElementById("Overdue").value;
    let publisher = document.getElementById("publisher").value;
    let datePublished = document.getElementById("date").value;
    let result = {
        "isbn": isbn,
        "title": bookTitle,
        "overdueFee": overDueFee,
        "publisher": publisher,
        "datePublished": datePublished
    }
    console.log(result);
    fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${hiddenId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result)
    })
    let editButton = document.getElementById("btnEdit");
    editButton.style.display = "block";
    setTimeout(_ => {
        fetchBookList()
    }, 1000)
}

let deleteModal = `<div class="modal fade" id="confirmDeleteBookModal" tabindex="-1" role="dialog"
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
                    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
                    <button id="deleteModalBtnYes" type="button" class="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
        </div>`

function deleteBook() {
    outlet.innerHTML = bookLists + deleteModal + outputList;
    $("#confirmDeleteBookModal").on("show.bs.modal", function (event) {
        const deletelink = $(event.relatedTarget);
        const bookId = deletelink.data("bookid");
        // console.log(bookId)
        const bookISBN = deletelink.data("bookisbn");
        const bookTitle = deletelink.data("booktitle");
        const theModalDialog = $(this);
        theModalDialog.find("#deleteModalBookISBN").text("ISBN:" + bookISBN);
        theModalDialog.find("#deleteModalBookTitle").text("Book Title: " + bookTitle);
        $("#deleteModalBtnYes").on("click", function () {
            // console.log(bookId)
            fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`,
                {
                    method: "delete"
                })
            $("#confirmDeleteBookModal").modal("hide");
            let btnDelete = document.querySelector("#deletebtn");
            btnDelete.style.display = "block";
            setTimeout(_ => {
                fetchBookList()
            }, 2000)
        })
    })
}


window.addEventListener('popstate', function (event) {
    //console.log(location.href.split("/").pop())
    if (history.state === "virtualPage") virtualPage();
    else if (history.state === "aboutPage") aboutPage();
    else if (history.state === "books") fetchBookList();
})


async function searchbook(event) {
    event.preventDefault();
    let searchResult = document.getElementById("searchBook").value;
    // console.log(searchResult)
    let initial = false;
    bookListfetch = await fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
    bookListArray = await bookListfetch.json()
    // console.log(bookListArray)
    let array = [];
    for (let key of bookListArray) {
        if (key["title"].includes(searchResult)) {
            array.push(key)
        }
    }
    fetchBookList(array)
}