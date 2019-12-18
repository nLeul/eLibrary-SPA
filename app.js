
    import  { fetchText,bodyBook } from './abel/fetchFIle.js';
    import  { tableFunc,footerTable,addHTML,editFunc,modalPage } from './abel/table.js';
    import  { postBookFunc,getById,editBookFetch } from './abel/fetchFIle.js';
   
    $(window).on("popstate",function(event){
         if(location.hash =="#books"){
            let tbl=tableFunc();
       
            bodyBook().then(resolve=>{
             resolve.forEach((item)=>{
                 tbl+=` <tr>
                 <th scope="col">${item.bookId}</th>
                 <th scope="col">${item.isbn}</th>
                 <th scope="col">${item.title}</th>
                 <th scope="col">${item.overdueFee}</th>
                 <th scope="col">${item.publisher}</th>
                 <th scope="col">${item.datePublished}</th>
                 <th scope="col"><button  data-bookid="${item.bookId}" class="editId btn btn-primary" style="float: right;">Edit</button></th>
                 <th scope="col"><a data-toggle="modal"  data-bookid="${item.bookId}"
                 data-bookisbn="${item.isbn}" data-booktitle="${item.title}" href="#confirmDeleteBookModal">delete</a>
                  </th>
               </tr>`;
             });
             tbl+=footerTable();
            
             $('#outlet').html(tbl);
            });
            
         } else if(location.hash =="#virtual"){
            fetchText(`./text/VirtualTour.txt`).then(file=>{
                $('#outlet').html(`<br><h1>WellCome to eLibrary&#174;</h1><br><img src="./image/panoramic.png" alt="index"><br><br>`+file);
            });
         }else if(location.hash =="#about"){
            fetchText(`./text/About.txt`).then(file=>{
                $('#outlet').html(`<br><h1>WellCome to eLibrary&#174;</h1><br>`+file);
            });
         }
    });
    
      
    fetchText(`./text/Indext.txt`).then(file=>{                             //default home page
        let dis=`<br><h1>WellCome to eLibrary&#174;</h1> <br>
        <img src="./image/banner1.png" alt="index"><br><br>`;
        $('#outlet').html(dis+file);
    });

    $("#homeID").click(function(e){                                      // home page
        e.preventDefault();
        fetchText(`./text/Indext.txt`).then(file=>{
            let dis=`<br><h1>WellCome to eLibrary&#174;</h1> <br><img src="./image/banner1.png" alt="index"><br><br>`;
            $('#outlet').html(dis+file);
        });
    });

    $("#aboutID").click(function(e){                                         //about page
        e.preventDefault();
        fetchText(`./text/About.txt`).then(file=>{
            $('#outlet').html(`<br><h1>WellCome to eLibrary&#174;</h1><br>`+file);
        });
    });

    $("#virtualID").click(function(e){                                         //virtual page
        e.preventDefault();
        fetchText(`./text/VirtualTour.txt`).then(file=>{
            $('#outlet').html(`<br><h1>WellCome to eLibrary&#174;</h1><br><img src="./image/panoramic.png" alt="index"><br><br>`+file);
        });
    });

    $("#booksID").click(function(e){                                         //book table page
        e.preventDefault();
       let tbl=tableFunc();
       
           bodyBook().then(resolve=>{
            resolve.forEach((item)=>{
                tbl+=` <tr>
                <th scope="col">${item.bookId}</th>
                <th scope="col">${item.isbn}</th>
                <th scope="col">${item.title}</th>
                <th scope="col">${item.overdueFee}</th>
                <th scope="col">${item.publisher}</th>
                <th scope="col">${item.datePublished}</th>
                <th scope="col"><button  data-bookid="${item.bookId}" class="editId btn btn-primary" style="float: right;">Edit</button></th>
                <th scope="col"><a data-toggle="modal"  data-bookid="${item.bookId}"
                data-bookisbn="${item.isbn}" data-booktitle="${item.title}" href="#confirmDeleteBookModal">delete</a>
                 </th>
              </tr>`;
            });
            tbl+=footerTable();
           
            $('#outlet').html(tbl);

           ////////////////////////////////////////////////////////////////////////////////////////
            $("#addBook").click(function(){                              // load addBook page
                $('#outlet').html(addHTML);

                    $("#addBookId").click(function(e){                 //save new book page
                        e.preventDefault();                  
                          let obj={
                            "isbn": $("#isbn").val(),
                            "title": $("#title").val(),
                            "overdueFee": $("#fee").val(),
                            "publisher": $("#publisher").val(),
                            "datePublished": $("#day").val()
                          }
                          postBookFunc(obj).then(resolve=>{
                            window.location =`http://127.0.0.1:5501/index.html`;
                          });
                    });
            });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $(".editId").click(function(){                         // load editBook page  
                console.log(this.dataset.bookid);
                let id=this.dataset.bookid;
                getById(id).then(obj=>{
                   let editHTML=editFunc(obj.isbn,obj.title,obj.overdueFee,obj.publisher,obj.datePublished);   
                    $('#outlet').html(editHTML);

                    $("#editBookId").click(function(e){
                        e.preventDefault();
                        let obj={
                            "bookId": id,
                            "isbn": $("#isbn").val(),
                            "title": $("#title").val(),
                            "overdueFee": $("#fee").val(),
                            "publisher": $("#publisher").val(),
                            "datePublished": $("#day").val()
                          }
                         
                          editBookFetch(obj).then(retu=>console.log(retu));
                    });
                });                        
                
            });

        });
    });       
    $("#searchBTN").click(function(e){                //////////////////////////   search
        e.preventDefault();
        let title=$("#searchIn").val();
        bodyBook().then(allObjs=>{
            let o=null;
            for(let obj of allObjs){
                if(obj.title == title){
                   o=obj;
                    break;
                }
            }
            if(o){
                alert("Title  => "+o.title+" isbn=> "+o.isbn+"  overdueFee=> "+o.overdueFee+"  publisher=> "+o.publisher);
            }
        });
    });



   
