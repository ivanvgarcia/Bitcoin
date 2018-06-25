var DOMStrings = {
    btn: document.querySelector("button"),
    price: document.getElementById("price"),
    time: document.getElementById("current-time")
}
var currency = "USD";

getData();

function getData() {
    var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
    fetch(url)
        .then(function (response) {
            if(!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .then(function (data) {
            var currentTime = data.time.updated;
            var bitcoinRate = data.bpi[currency].rate_float;
            var symbol = data.bpi.USD.symbol;
            DOMStrings.price.textContent = `$ ${bitcoinRate} ${currency}`;
            DOMStrings.time.textContent = currentTime;
        })
        .catch(function(error){
            console.log(error);
            DOMStrings.price.textContent = `The API is currently down`;
        });
}

DOMStrings.btn.addEventListener("click", function (e) {
    e.preventDefault();
    getData();
});