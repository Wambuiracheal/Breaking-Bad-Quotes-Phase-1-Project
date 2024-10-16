const url = "https://api.breakingbadquotes.xyz/v1/quotes/"
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


function displayQuote(quote){
    const quoteDiv = document.createElement("div")
    quoteDiv.classList.add("quote")
    quoteDiv.innerHTML=`
        <p>
        <strong>Author:</strong> ${quote.author}<br>
        <strong>Quote:</strong> ${quote.quote}<br><br>
        <button id="like"><i onclick="myFunction(this)" class="fa fa-thumbs-up"></i></button>
        </p>
    `
    let x = document.createElement("button")
    x.textContent = "delete"
    x.addEventListener('click', ()=>{
        x.parentNode.remove()
    })
    quoteDiv.appendChild(x)

    let quoteList=document.getElementById("quotes")

    quoteList.appendChild(quoteDiv)
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
