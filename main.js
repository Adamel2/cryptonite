
"use strict"

function handleList(event) {
    event.preventDefault();
    document.getElementById("child").innerHTML = '';
    if (localStorage.getItem('list')) {

        const list = JSON.parse(localStorage.getItem('list'));

        for (let index = 0; index < list.length; index++) {
            document.getElementById("child")
                .innerHTML += `<div id="${list[index].symbol}" class="card" style="width: 18rem;">
        <div class="card-body">
        <div class="custom-control custom-switch">
        <h5 class="card-title"> <img src="${list[index].image}}" />${list[index].symbol}</h5>
        <input type="checkbox" value="${list[index].symbol}" class="custom-control-input ${list[index].symbol}" id="${list[index].id}" onclick="myEvent(event)" ${(localStorage.getItem(list[index].symbol) != null) && 'checked'} > 
        <label class="custom-control-label" for="${list[index].id}"></label>

      </div>
          <p class="card-text">${list[index].name}</p>
          <button id="${list[index].id}" class="btn btn-primary" onclick="handleMoreInfo(event)" type="button" 
          data-toggle="collapse" data-target="#${list[index].id + list[index].id}" aria-expanded="false"
           aria-controls="collapseExample"> More info</button>
          <p class="collapse .loading-price text-danger" id="${list[index].id + list[index].id}">
         </p>
        </div>

      </div>`

        }
    } else {
        const cryptoList = [];
        setTimeout(() => {
            document.getElementById("child").innerHTML = `<div class="loading"><div class="spinner-grow text-success" style="width: 3rem; height: 3rem;" role="status">
             <span class="visually-hidden"></span>
            </div>
            <div class="spinner-grow text-success" style="width: 3rem; height: 3rem;" role="status">
             <span class="visually-hidden"></span>
            </div>
            <div class="spinner-grow text-success" style="width: 3rem; height: 3rem;" role="status">
             <span class="visually-hidden"></span>
            </div></div>`
        }, 1)
        setTimeout(() => {
            document.getElementById("child").innerHTML = '';
            $.ajax({
                url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
                success: response => {
                    for (let index = 0; index < response.length; index++) {

                        cryptoList.push({ 'symbol': response[index].symbol, 'image': response[index].image, 'id': response[index].id, 'name': response[index].name })
                        document.getElementById("child")
                            .innerHTML += `<div id="${response[index].symbol}" class="card" style="width: 18rem;">
                <div class="card-body">
                <div class="custom-control custom-switch">
                <h5 class="card-title"> <img src="${response[index].image}}" />${response[index].symbol}</h5>
                <input type="checkbox" value="${response[index].symbol}" class="custom-control-input ${response[index].symbol}" id="${response[index].id}" onclick="myEvent(event)" ${(localStorage.getItem(response[index].symbol) != null) && 'checked'} > 
                <label class="custom-control-label" for="${response[index].id}"></label>

              </div>
                  <p class="card-text">${response[index].name}</p>
                  <button id="${response[index].id}" class="btn btn-primary" onclick="handleMoreInfo(event)" type="button" 
                  data-toggle="collapse" data-target="#${response[index].id + response[index].id}" aria-expanded="false"
                   aria-controls="collapseExample"> More info</button>
                  <p class="collapse .loading-price text-danger" id="${response[index].id + response[index].id}">
                 </p>
                </div>

              </div>`


                    }
                },
                error: err => alert(err.status)
            });
        }, 3100);
        setTimeout(() => {

            localStorage.list = JSON.stringify(cryptoList);
        }, 5000)
    }

}

function handleMoreInfo(event) {
    event.preventDefault();
    if (localStorage.getItem(event.target.id + event.target.id)) {
        const item = JSON.parse(localStorage.getItem(event.target.id + event.target.id));
        document.getElementById(event.target.id + event.target.id)
            .innerHTML = `${item.usd} $ <br>
                      ${item.eur} € <br>
                      ${item.ils} ₪`
    } else {
        document.getElementById(event.target.id + event.target.id).innerHTML = `<div class="loading-price">
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
  `
        setTimeout(() => {

            $.ajax({
                url: "https://api.coingecko.com/api/v3/coins/" + event.target.id,
                success: response => {
                    document.getElementById(event.target.id + event.target.id)
                        .innerHTML = `${response.market_data.current_price.usd} $ <br>
                                  ${response.market_data.current_price.eur} € <br>
                                  ${response.market_data.current_price.ils} ₪`
                    localStorage.setItem(event.target.id + event.target.id, JSON.stringify({ 'usd': response.market_data.current_price.usd, 'eur': response.market_data.current_price.eur, 'ils': response.market_data.current_price.ils }))
                }
            });
        }, 1000)
    }

}
function handleAboutPage(event) {
    event.preventDefault();
    document.getElementById("child").innerHTML = `<div class="d-flex flex-column align-items-center"><h1 class="bg-info ">Welcome in About Page</h1>
    
    <h3 class="bg-info">Name : Eldda Adham</h3>
    <h3 class="bg-info">Email : Adamel2@ac.sce.ac.il</h3>
    <h3 class="bg-info">Study : Software engineering</h3>
    <h3 class="bg-info">Project description : Cryptonite coins live price</h3>
    <img class="private-img" src='assets/img/private-photo.png'/>
    <h2 class="bg-info">Good Day</h2>
    </div>`;

}

function myEvent(event) {
    if (event.target.checked === false) {
        localStorage.removeItem(event.target.value);
    } else {
        localStorage.setItem(event.target.value, event.target.value);
    }
}
function clearLocalStorage() {
    event.preventDefault();
    localStorage.clear();
    Swal.fire(
        'clear ',
        'your graph is cleared',
        'success'
    )
}

function search(event) {
    var input = document.getElementById("Search");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('card')

    
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = "inline-block";
        } else {
            nodes[i].style.display = "none";
        }
    }
    
    input.value = '';
}
