export async function fetchText(dir){
     let fetchObj=await fetch(dir);
     let obj= fetchObj.text();
     return obj;
}

export async function bodyBook(){
    let fetchObj=await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/list`);
    let jsonObj=await fetchObj.json();
    return jsonObj;
}

export async function postBookFunc(bookObj){
    let fetchObj=await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/add`,{
    method: 'POST',
    body: JSON.stringify(bookObj), 
    headers: {
        'Content-Type': 'application/json'
    }
    });
    let jsonObj=await fetchObj.json();

    return jsonObj;
}

export async function getById(id){
    let fetchObj=await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/get/${id}`);
    let jsonObj=await fetchObj.json();
    return jsonObj; 
  }

  export async function editBookFetch(obj){
    let fetchObj=await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/${obj.bookId}`,{
      method: 'PUT',
      body: JSON.stringify(obj), 
      headers: {
          'Content-Type': 'application/json'
      }
      });
      let jsonObj=await fetchObj.json();
  
      return jsonObj;
  }


  export async function deleteFunc(id){
    await fetch(`https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/${id}`,{
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
      });
  }