(function (){

    let refresh = $("#icon1");
    let tweet = $("#icon2");

    const openUrl = function (url) {
        window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
    }

    const isInIframe = function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    const quote = function () {
        return fetch("https://api.quotable.io/random").then((response) => {
            return response.json();
        });
    };

    const getRandomQuote = function () {
        return quote().then(addQuote);
    }

    const addQuote = function (quote) {
        var author = quote.author || "No corresponding author";
        var content = quote.content || "No corresponding contents";
        var authorhtml = $(`<p>${author}</p>`);
        authorhtml.css('font-size', '25px');
        authorhtml.css('font-style', 'italic');
        $('#text>p').text(content);
        var authorRegion = $('#author');
        if (!authorRegion[0].firstChild){
            authorRegion.append(authorhtml);
        } else {
            authorRegion.text(author);
        }
    }

    refresh.on('click', () => {
        var content = $("#text>p");
        var author = $("#author");
        content.text("Loading...");
        author.text("");
        var newQuote = quote();
        newQuote.then(addQuote);
    });

    tweet.on('click', () => {
        var content = $("#text>p").text();
        var author = $("#author").text();
        $("#icon2").attr(
                "href", 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + 
                    encodeURIComponent('"' + content + '"' + author)
            );
        }
    );


$(document).ready(getRandomQuote);
})();