const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');

function displayQuote(){
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
            .then(data => {
                quoteText.innerText = `"${data.content}"`
                quoteAuthor.innerText = `- ${data.author}`
            }) 
}

displayQuote();
setInterval(displayQuote, 1000*60);
