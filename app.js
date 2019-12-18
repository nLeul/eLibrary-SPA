const index = `<img src="image/Home.jpg" height="550" width="1100"alt="panoramic" >`
const virtual = `<img src="image/original.jpg" height="550" width="1100" alt="panoramic" >`
let mytable = `<h3>Books in our Collection </h3>
                <a type="button" onclick= "addbook()" id="addbooks" class="btn btn-outline-success" style="float:right;">Add Books</a>
                `
let aboutimage= `<img src="image/index.jpg" height="550" width="1100" alt="panoramic" >`
let newbook = `<h2>New Book Form <span id="pbtdisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >Book added Successfully</span> </h2>
                `
let editbook = `<h2>Editing Book Form <span id="editeddisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >Book updated Successfully</span></h2>`
let addbooks = `
<form onsubmit="postbook(event)">
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
                        <button type="submit"  id="save" class="btn btn-primary">Save Book</button>
                    </div>
                </span>

            </div>
</form>
`
// global declaration for div outlet
const outlet = document.getElementById("outlet");
// window popstate for virtual,about,books and index pages
window.addEventListener('popstate', function(event){
    if(history.state==="virtual")
    virtualPage();
    else if(history.state==="about")
    aboutPage();
    else if(history.state==="books")
    fetchbook();
    else if(history.state==="index")
    msdPage();
    
})
/**
     * Function to display aboutPage from the image and feteched text from localstorage
     * 
     * @param {ImageData} image image of object to display
     * @param {String} stringify a fetch text pharagraph 
     * @param {state} state push history state for aboutPage listening the event
     * 
     */
function aboutPage() {

    fetch("text/About.txt")
        .then((reponse) => reponse.text())
        .then((data) => {
            outlet.innerHTML = aboutimage + data;
        })
};
document.getElementById("aboutID").addEventListener("click",function(){
    history.pushState("about","","?about")
    aboutPage()
    event.preventDefault()
})
const about = document.getElementById("aboutID");
about.addEventListener("click", aboutPage)

/**
     * Function to display virtualPage from the image and feteched text from localstorage
     * 
     * @param {ImageData} image image of object to display
     * @param {String} stringify a fetch text pharagraph 
     * @param {state} state push history state for virtualPage listening the event
     * 
     */
function virtualPage() {

    fetch("text/VirtualTour.txt")
        .then((reponse) => reponse.text())
        .then((data) => {
            outlet.innerHTML = virtual + data;
        })
};
const virtualbtn = document.getElementById("virtualID");
virtualbtn.addEventListener("click", virtualPage)

document.getElementById("virtualID").addEventListener("click",function(){
    history.pushState("virtual","","?virtual")
    virtualPage()
    event.preventDefault()
})

/**
     * Function to display msdPage from the image and feteched text from localstorage
     * 
     * @param {ImageData} image image of object to display
     * @param {String} stringify a fetch text pharagraph 
     * @param {state} state push history state for virtualPage listening the event
     * 
     */
msdPage()
function msdPage() {
    fetch("text/Indext.txt")
        .then((reponse) => reponse.text())
        .then((data) => {
            outlet.innerHTML = index + data;
        })
};
const indexbtn = document.getElementById("indexID");
indexbtn.addEventListener("click", msdPage)

document.getElementById("indexID").addEventListener("click",function(){
    history.pushState("index","","?index")
    msdPage()
    event.preventDefault()
})

/**
     * Function to fetch books from the given url
     * 
     * @param {Object} element clicked html element
     *  @param {state} state push history state for fetchbook listening the event
     */
function fetchbook() {
    fetch("https://elibraryrestapi.herokuapp.com/elibrary/api/book/list")
        .then((resp) => resp.json())
        .then((data) => {
            getbook(data)
        })
}

let output = "";
function getbook(arr) {
    
    output =
        `<span id="btdisplay" class="btn btn-success" style="display: none; margin-left: 400px; margin-right: 400px;" >
        Book deleted Successfully</span>
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
    </thead>
    `
    arr.forEach((element) => {
        output += `<tr>
    <td scope="col">${element.bookId}</td>
    <td scope="col"> ${element.isbn}</td>
    <td scope="col">${element.title}</td>
    <td scope="col">${element.overdueFee}</td>
    <td scope="col">${element.publisher}</td>
    <td scope="col">${element.datePublished}</td>
    <td scope="col"><a href="# ?bookId=${element.bookId}" onclick="edittokenbook(${element.bookId})">Edit</a></th>
    <td><a data-toggle="modal" data-bookid="${element.bookId}" data-bookisbn="${element.isbn}" 
    data-booktitle="${element.title}" href="#confirmDeleteBookModal" onclick="deletebook(${element.bookId})">Delete</a></td>
              </tr>`
    })
    outlet.innerHTML = mytable + output;

}

const bookbtn = document.getElementById("booksID");
bookbtn.addEventListener("click", fetchbook)

document.getElementById("booksID").addEventListener("click",function(){
    history.pushState("books","","?books")
    fetchbook()
    event.preventDefault()
})

/**
     * Function to add books to the given url
     * 
     * @param {Object} element clicked to display html element
     *  @param {state} state push history state for addbook listening the event
     */
function addbook() {

    outlet.innerHTML = newbook + addbooks;
};

let addeditbooks = `
<form onsubmit="postedited(event)">
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
                        <input type="hidden" id="bookId">
                        <button type="submit"  id="editsave" class="btn btn-primary">Save Book</button>
                    </div>
                </span>

            </div>
</form>            
`
/**
     * Function to add books to the given url
     * 
     * @param {Object} element clicked to post an object element
     *  @param {state} state push history state for postbook listening the event
     */
async function postbook(event) {
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
        fetchbook()
    }, 2000)

};

async function edittokenbook(bookId) {
    outlet.innerHTML = editbook + addeditbooks
    //console.log(bookId);
    const resp = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${bookId}`)
    const respBody = await resp.json();

    document.getElementById("bookId").value = respBody.bookId;
    document.getElementById("title").value = respBody.title;
    document.getElementById("isbn").value = respBody.isbn;
    document.getElementById("publisher").value = respBody.publisher;
    document.getElementById("Overdue").value = respBody.overdueFee;
    document.getElementById("date").value = respBody.datePublished;

};

/**
     * Function to edit books to the given url
     * 
     * @param {Object} element clicked to edit an object element
     *  @param {state} state push history state for postbook listening the event
     */
async function postedited(event) {
    event.preventDefault();

    let bookId = document.getElementById("bookId").value;
    let Title = document.getElementById("title").value;
    let IsBn = document.getElementById("isbn").value;
    let publisher = document.getElementById("publisher").value;
    let overdueFee = Number(document.getElementById("Overdue").value);
    let dateP = document.getElementById("date").value;
    //console.log(Title);

    let resp = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "isbn": IsBn,
            "title": Title,
            "overdueFee": overdueFee,
            "publisher": publisher,
            "datePublished": dateP
        })
    });

    let displ = document.getElementById("editeddisplay");
    displ.style.display = "block";
    setTimeout(_ => {
        fetchbook()
    }, 2000)
};

let modal = ` <div class="modal fade" id="confirmDeleteBookModal" tabindex="-1" role="dialog"
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
            <p id="isbn"></p>
            <p id="title"></p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <input type="hidden" id="bookId">
            <button id="deleteModalBtnYes" onclick="deletebook(bookId)" type="button" data-dismiss="modal" class="btn btn-primary">Yes</button>
        </div>
    </div>
</div>
</div>`

/**
     * Function to delete books to the given url
     * 
     * @param {Object} element clicked to delete an object element
     *  @param {state} state push history state for postbook listening the event
     */
function deletebook(bookId) {
    //let displydelete = document.getElementById("confirmDeleteBookModal")
    outlet.innerHTML = modal + mytable + output;
    $('#confirmDeleteBookModal').on('show.bs.modal', function (event) {
        bookId = $(event.relatedTarget).data('bookid');
        //alert(bookId)
        let isbn = $(event.relatedTarget).data('bookisbn');
        let title = $(event.relatedTarget).data('booktitle');
        $(this).find('.modal-body #isbn').text("Isbn: " + isbn);
        $(this).find('.modal-body #title').text("Book title: " + title);
        $('#deleteModalBtnYes').click(async function () {
            await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${bookId}`, {
                method: "delete"

            })
            let disp = document.getElementById("btdisplay");
            disp.style.display = "block";
            setTimeout(_ => {
                fetchbook()
            }, 2000)
            disp.style.display = "block";
        })
    })

}
/**
     * Function to search objects from the array that the selected property first character is in the pattern
     * 
     * @param {Array} arr arry of objects to search from
     * @param {String} searchBy a property of an object to search with
     * @param {String} pattern a string value to match with property of the object
     */
async function searchbook(ob) {
    let bookval = document.getElementById("searchId");
   // console.log(bookval)
    let resp = await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/list`)
    let result = await resp.json();
   // console.log(result)
    let arr = [];
    for (let item of result) {
        if (item.title.includes(bookval.value)) {
            arr.push(item)
        }
    }
    console.log(arr);
    getbook(arr)
}
