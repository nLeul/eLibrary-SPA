let listFeching = "https://elibraryrestapi.herokuapp.com/elibrary/api/book/list"
function fetchAboutText() {
    fetch("text/About.txt")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("outlet").innerHTML = data;
        })
        .catch((err) => console.log(err))
}

about = document.getElementById("aboutID")
about.addEventListener("click", fetchAboutText)

function fetchVertual() {
    fetch("text/VirtualTour.txt")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("outlet").innerHTML = vertualImage + data;
        })
        .catch((err) => console.log(err))
}
vertualBtn = document.getElementById("virtualID")
vertualBtn.addEventListener("click", fetchVertual)
vertualImage = `<img src="image/panoramic.png" alt"panaromic" style=>`

function fetchFrontPage() {
    fetch("text/indext.txt")
        .then((res) => res.text())
        .then((data) => {
            document.getElementById("outlet").innerHTML = wellCameImg + data;
        })
        .catch((err) => console.log(err))
}

wellCameImg = `<img src="image/banner1.png" alt"panaromic" style=>`;
wellCamePage = document.querySelector(".navbar-brand");
wellCamePage.addEventListener("click", fetchFrontPage);
fetchFrontPage();

 function creatingHeading() {
    
    return Column;

}
function bookGetFeching() {
    fetch(listFeching )
        .then((res) => res.json())
        .then((data) => {
            tableCreatingFun(data)
        })
}
function tableCreatingFun(arr) {
   // document.getElementById("outlet").innerHTML = creatingHeading();
    // let tablBody = "";
    let tablBody = `
    <table class="table table-hover">
 <thead>
    <tr>
      <th scope="col">Type</th>
      <th scope="col">ISBN</th>
      <th scope="col">Book Title</th>
      <th scope="col">Overdue Fee</th>
      <th scope="col">Publisher</th>
      <th scope="col">Date Published</th>
    </tr>
    </thead>`

    arr.forEach((element, i) => {
        tablBody += ` <tr>
              <td>${i+1}</td>
              <td> ${element.isbn}</td>
              <td>${element.title}</td>
              <td>${element.overdueFee}</td>
              <td>${element.publisher}</td>
            <td>${element.datePublished}</td>
           </tr>`
    })
    document.getElementById("outlet").innerHTML =tablBody;
}
bookBtn = document.getElementById("booksID");
bookBtn.addEventListener("click", bookGetFeching);

let addBook=`  <div class="container">
<h3></h3>
<form>
  <fieldset>
    <legend>New Book Form</legend>

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
<button type="button" id="ResetId"class="btn btn-primary" style="margin-top: 15px;">Reset</button>
<button type="button"id="SaveBookId" class="btn btn-secondary"style="margin-top: 15px">Save Book</button>
    
</div>`
