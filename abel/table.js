//import  { bodyBook } from './abel/fetchFIle.js';


export function tableFunc(){
    let table=`<br> <div class="row">
    <div class="col">
        <h2>Books our collection&#174;</h2>
    </div>
    <div class="col">
        <h4 id="deleteId" style="background-color: aquamarine; width: auto;" ></h4>
    </div>
    <div class="col">
        <button id="addBook" type="button" class="btn btn-secondary" style="float: right;">Add New Book</button>
    </div>
       
  </div><br><table class="table table-hover">
            <thead> <tr>
            <th scope="col">Book Id</th>
            <th scope="col">ISBN</th>
            <th scope="col">Book Title</th>
            <th scope="col">Overdue Fee</th>
            <th scope="col">publisher</th>
            <th scope="col">Date Published</th>
          </tr></thead> <tbody>`;                  
    
            return table;
}

export function footerTable(){
    return `</tbody> </table>`;
}
export function editFunc(isbn,title,overdueFee,publisher,datePublished){
    let editHTML=`<div class="row">
<div class="col">
   <h1>Edit Book Form</h1>
</div>
<div class="col">
   <h4 id="dis" style="background-color: aquamarine; "></h4>
</div>
</div> 

<form>
   *required form field
   <div class="row">
       <div class="col">
               *Book Title
               <input type="text" class="form-control" id="title" value="${title}" required>
        </div>
   </div><br>
   <div class="row">
     <div class="col">
           *ISBN
       <input type="text" class="form-control" id="isbn" value="${isbn}" required>
     </div>
     <div class="col">
           *Overdue Fee per day
       <input type="text" class="form-control" id="fee" value="${overdueFee}" required>
       Enter a valid decimal amount in dollar and cent; no comma (e.g. 1.99)
     </div>
   </div><br>

   <div class="row">
         <div class="col">
               *Publisher
           <input type="text" class="form-control" id="publisher" value="${publisher}" required>
         </div>
         <div class="col">
               *Date Published
           <input type="date" class="form-control" id="day" value="${datePublished}" required>
         </div>
       </div><br>
     <div style="float: right;">
           <button class="btn btn-danger">Reset</button>
           <button class="btn btn-primary" id="editBookId">Edit Book</button>
     </div>
      
 </form>`;
 return editHTML;
}

export let addHTML=`<h1>New Book Form</h1>            
<form>
    *required form field
    <div class="row">
        <div class="col">
                *Book Title
                <input type="text" class="form-control" placeholder="Book Title" id="title" required>
         </div>
    </div><br>
    <div class="row">
      <div class="col">
            *ISBN
        <input type="text" class="form-control" placeholder="ISBN" id="isbn" required>
      </div>
      <div class="col">
            *Overdue Fee per day
        <input type="text" class="form-control" placeholder="0.00" id="fee" required>
        Enter a valid decimal amount in dollar and cent; no comma (e.g. 1.99)
      </div>
    </div><br>

    <div class="row">
          <div class="col">
                *Publisher
            <input type="text" class="form-control" placeholder="publisher" id="publisher" required>
          </div>
          <div class="col">
                *Date Published
            <input type="date" class="form-control" id="day" required>
          </div>
        </div><br>
      <div style="float: right;">
            <button class="btn btn-danger">Reset</button>
            <a id="addBookId" class="btn btn-primary">Submit New Book</a>
      </div>
       
  </form>`;

  export let modalPage= `<div class="modal fade" id="confirmDeleteBookModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
              <br/>
              <p id="deleteModalBookISBN"></p>
              <p id="deleteModalBookTitle"></p>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
              <button id="deleteModalBtnYes" type="button" class="btn btn-primary">Yes</button>
          </div>
      </div>
  </div>
</div>`;