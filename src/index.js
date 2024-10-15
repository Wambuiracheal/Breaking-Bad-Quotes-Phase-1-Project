const url = "https://api.breakingbadquotes.xyz/v1/quotes"
document.addEventListener("DOMContentLoaded", ()=>{
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        data.ForEach(quote =>{
            quoteDisplay(quote);
        })
    })
    .catch(error => console.log(error))
})

//display and the edit form
function quoteDisplay(quote){
    let quote= document.getElementById("add-quote")
    let quoteDiv = document.createElement("div")
    quoteDiv.classList.add(quote)
    quoteDiv.innerHTML=`
        <p>quote: ${quote.author}</p>
        <p>name: ${quote.name}</p>
        <form onclick="editquote=(element.this.${quote.id})>
            label for="author">New Author</label>
            <input type="text" name="author" id="author" required><br><br>
            <label for="quote">New Quote</label>
            <input type="text" name="quote" id="quote" required><br><br>
            <button id="submit">Submit</button>
        </form>
        <button onclick="deleteQuote(${quote.id})">Delete</button>
    `
    let quoteList=document.getElementById("quotes")
    quoteList.appendChild(quote)
}

//DELETE
function deleteQuote(){

}