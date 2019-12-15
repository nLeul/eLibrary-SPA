/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable strict */

let bookTable = document.getElementById("outlet");
let aboutBtn = document.querySelector("#aboutID")
aboutBtn.addEventListener("click", fetchAbout)
function fetchAbout() {
    const about =`
    <img src="image/banner1.png" alt="panoramic" width="100%">
    `
    fetch("text/About.txt")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("outlet").innerHTML = about+data;
        });
}
let virtualBtn = document.getElementById("virtualID")
virtualBtn.addEventListener("click", fetchVirtual)
function fetchVirtual() {
    const virtual =`
    <img src="image/panoramic.png" alt="panoramic">
    `
    fetch("text/VirtualTour.txt")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("outlet").innerHTML = virtual + data;
        });
}


document.getElementById("booksID").addEventListener("click",addBook)
let myTable="";
function addBook(){
    myTable =`
            <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">ISBN</th>
                    <th scope="col">Book Title</th>
                    <th scope="col">Over Due Fee</th>
                    <th scope="col">publisher</th>
                    <th scope="col">Date Published</th>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">&nbsp;</th>
                </tr>
            </thead>`;
    
        fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/list`)
            .then(res => res.json())
            .then(data => {
                let count = 1;
                data.forEach(value => {
                    //arrToSearch.push(value);
                    myTable += `
                <tr>
                    <td>${count}</td>
                    <td>${value.isbn}</td>
                    <td>${value.title}</td>
                    <td>US$${value.overdueFee}</td>
                    <td>${value.publisher}</td>
                    <td>${value.datePublished}</td>
                    <td><a href= editBook.html?bookId=${value.bookId}>Edit</a></td>
                    <td><a data-toggle="modal" data-bookid="${value.bookId}" data-bookisbn="${value.isbn}" 
                    data-booktitle="${value.title}" href="#confirmDeleteBookModal">Delete</a></td>            
                </tr>`;
                    count++;
    
                });
                bookTable.innerHTML = myTable;
                //arrToSearch.push(value);
                //console.log(arrToSearch);
            });
    }
    