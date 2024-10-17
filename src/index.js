const url = "https://api.breakingbadquotes.xyz/v1/quotes/4"
const singleQuoteUrl = "https://api.breakingbadquotes.xyz/v1/quotes/1";

document.addEventListener("DOMContentLoaded", ()=>{
    fetchQuotes()
});

function fetchQuotes(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        
        data.forEach(quote => {
            displayQuote(quote);
        })

    })
    .catch(error => console.log(error))
}

function fetchSingleQuote(){
    fetch(singleQuoteUrl)
    .then(response => response.json())
    .then(data =>{
        data.forEach(quote => {
            displayQuote(quote);
        })
    })
    .catch(error => console.log(error))
}

//generate a random quote button
let genButton = document.getElementById("get-quote")
genButton.addEventListener('click', () => {
    fetch(singleQuoteUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(quote => {
            displayQuote(quote);
        })
    })
    .catch(error => console.log(error))
})

//mouseover effect for the generate random button 
let quoteBtn =  document.getElementById("get-quote")
quoteBtn.addEventListener("mouseover", () =>{
    quoteBtn.style.background = "rgb(10, 235, 10)"
})
quoteBtn.addEventListener("mouseleave", () =>{
    quoteBtn.style.background = ""
})

//mouseover effect for update button
let submitBtn =  document.getElementById("update")
submitBtn.addEventListener("mouseover", () =>{
    submitBtnn.style.background = "rgb(10, 235, 10)"
})
submitBtn.addEventListener("mouseleave", () =>{
    submitBtn.style.background = ""
})

//displayquote function/like/delete/comment for quotes
function displayQuote(quote) {
    const quoteDiv = document.createElement("div");
    quoteDiv.classList.add("quote");
    quoteDiv.innerHTML = `
        <p>
        <strong>Author:</strong> ${quote.author}<br>
        <strong>Quote:</strong> ${quote.quote}<br><br>
        </p>
    `;

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button")

    //like
    let likeBtn = document.createElement("button");
    likeBtn.id="like-button"
    likeBtn.textContent = "♥️";
    likeBtn.style.color = "aliceblue";
    likeBtn.addEventListener('click', () => {
        likeBtn.style.color = likeBtn.style.color === "red" ? "black" : "red";
    });
    quoteDiv.appendChild(likeBtn);
    
    ///delete
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete"
    deleteBtn.id="delete-btn"
    deleteBtn.addEventListener('click', () => {
        quoteDiv.remove();
    });
    quoteDiv.appendChild(deleteBtn);

    let quoteList = document.getElementById("quotes");
    quoteList.appendChild(quoteDiv);

    //comment
     let myForm = document.createElement("form");
     myForm.classList.add("comment-form");
 
     let formInput = document.createElement("input");
     formInput.name = "comment"
     formInput.id = "comment"
     formInput.placeholder = "comment here..."
     formInput.required = true
     
     let submitBtn = document.createElement("button");
     submitBtn.textContent = "Add"
     submitBtn.id="btnSubmit"
     submitBtn.type = "submit"

     myForm.appendChild(formInput)
     myForm.appendChild(submitBtn)
 
        //submit button
        myForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let value = formInput.value

            //appending a delete function for the comments uploaded
            let commentDiv = document.createElement("div")
            commentDiv.textContent = value

            let commDeleteBtn = document.createElement("button")
            commDeleteBtn.textContent ="Delete"
            commDeleteBtn.classList.add("delete-comment")

            commDeleteBtn.addEventListener('click', ()=> {
                commentDiv.remove()
            })

            commentDiv.appendChild(commDeleteBtn)
    
            quoteDiv.appendChild(commentDiv)
    
            myForm.reset();
        });
    
     quoteDiv.appendChild(myForm)
 
}

//POST
let newQuotesForm = document.getElementById("new-quotes");
newQuotesForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const newData = {
        
        author: formdata.get('author'),
        quote: formdata.get('quote')
    };

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(newData);
        displayQuotes(data);
        newQuotesForm.reset(); 
    })
    .catch(error => console.log(error));
});

//DELETE------doesnot work with my API
function deleteQuote(id){
    fetch(`${url}/${id}`,{
        method: "DELETE",
        headers:{
            'Content-type':"application/json"
        }

        .then(response => response.json())
        .then(()=>{
            alert("Deleted Successfully")
        })
        .catch(error => console.log(error))
    })
}

//UPDATE---doesnot work with my API
function editQuote (e,form,id){
    e.preventDefault()
    const formData = new FormData(form)
    const updateData = {
        author: formData.get("author"),
        quote: formData.get("quote"),
    
    }
    fetch(`${url}/${id}`,{
        method:"PATCH",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(updateData),
    })
    .then(response => response.json())
    .then(()=>{
        alert("Updated Successfully")
    })
    .catch(error => console.log(error))
    
}
