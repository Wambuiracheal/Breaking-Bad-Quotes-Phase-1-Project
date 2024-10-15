const url = "https://api.breakingbadquotes.xyz/v1/quotes"
document.addEventListener("DOMContentLoaded", ()=>{
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(quote => {
            displayQuotes(quote);
        })

    })
    .catch(error => console.log(error))
})

//generate a random quote button
    let genButton = document.getElementById("get-quote")
    genButton.addEventListener('click', () => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("quotes").innerHTML = '';
            data.forEach(quote => {
                displayQuotes(quote);
            })
    
        })
        .catch(error => console.log(error))
    })

//display and the edit form
function displayQuotes(quote){
    let quoteDiv= document.getElementById("quotes")
    quoteDiv = document.createElement("div")
    quoteDiv.classList.add("quote")
    quoteDiv.innerHTML=`

        <p>
        <strong>Author:</strong> ${quote.author}<br><br>
        <strong>Quote:</strong> ${quote.quote}<br><br>
        </p><br>
        <!-->
        <form id="edit-btn" onsubmit="editQuote(event,this,${quote.id})">
            <label for="author">New Author</label>
            <input type="text" name="author" id="author" required><br><br>
            <label for="quote">New Quote</label>
            <input type="text" name="quote" id="quote" required><br><br>
            <button id="update">Update</button>
        </form>>
        <button id="delete-btn" onclick="deleteQuote(${quote.id})">Delete</button>
    `
    let quoteList=document.getElementById("quotes")
    quoteList.appendChild(quoteDiv)
}

//POST
document.getElementById("add-quote").addEventListener("submit",(e)=>{
    e.preventDefault()
    const formdata = new FormData(e.target)
    const newData = {
        author:formdata.get('author'),
        quote:formdata.get('quote')
    }

    fetch(url,{
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newData)
    })
    .then (response => response.json())
    .then( () =>{
        console.data(newData)
        .catch(error => console.log(error))
    })
})

//mouseover effect
    let quoteBtn =  document.getElementById("get-quote")
    quoteBtn.addEventListener("mouseover", () =>{
        quoteBtn.style.background = "rgb(10, 235, 10)"
    })
    quoteBtn.addEventListener("mouseleave", () =>{
        quoteBtn.style.background = ""
    })

//DELETE------doesnor work with my API
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
