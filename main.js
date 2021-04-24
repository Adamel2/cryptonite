function handleList() {
    document.getElementById("child").innerHTML = '';
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
                document.getElementById("child")
                    .innerHTML += `<div id="${response[index].symbol}" class="card" style="width: 18rem;">
                <div class="card-body">
                <div class="custom-control custom-switch">
                <h5 class="card-title"> <img src="${response[index].image}}" />${response[index].symbol}</h5>
                <input type="checkbox" value="${response[index].symbol}" class="custom-control-input" id="${response[index].id}" onclick="myEvent(event)"> 
                <label class="custom-control-label" for="${response[index].id}"></label>

              </div>
                  <p class="card-text">${response[index].name}</p>
                  <button id="${response[index].id}" class="btn btn-primary" onclick="handleMoreInfo(event)" type="button" 
                  data-toggle="collapse" data-target="#${response[index].id + response[index].id}" aria-expanded="false"
                   aria-controls="collapseExample"> More info</button>
                  <p class="collapse my-paragraph text-danger" id="${response[index].id + response[index].id}">
                 </p>
                </div>

              </div>`

            }
        },
        error: err => alert(err.status)
    });},3100);

}
function handleLiveReport() {
    let myArray = []
    let nameColumn = []
    document.getElementById("child").innerHTML = '';
    if (localStorage.length == 5) {

        let restAPI = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${Object.keys(localStorage).toString()}&tsyms=USD&api_key=c8098bf2cfcbeea52b17bcbb6b359bfad7e38e4594e2d0fdc6e5a529b5fcec70`
        $.ajax({
            url: restAPI,
            success: response => {
                for (var key in response) {
                    myArray.push(response[key])
                    nameColumn.push(key);

                }
                var chart = new CanvasJS.Chart("child", {
                    title: {
                        text: "Spline Chart with Export as Image"
                    },
                    animationEnabled: true,
                    exportEnabled: true,
                    data: [
                        {
                            type: "spline", //change it to line, area, column, pie, etc
                            showInLegend: true,
                            name: nameColumn[0],
                            dataPoints: [
                                { x: 10, y: myArray[0].USD },
                                { x: 20, y: myArray[0].USD },
                                { x: 30, y: myArray[0].USD },
                                { x: 40, y: myArray[0].USD },
                                { x: 50, y: myArray[0].USD },
                                { x: 60, y: myArray[0].USD },
                                { x: 70, y: myArray[0].USD },
                                { x: 80, y: myArray[0].USD }
                            ]
                        },
                        {
                            type: "spline", //change it to line, area, column, pie, etc
                            showInLegend: true,
                            name: nameColumn[1],
                            dataPoints: [
                                { x: 10, y: myArray[1].USD },
                                { x: 20, y: myArray[1].USD },
                                { x: 30, y: myArray[1].USD },
                                { x: 40, y: myArray[1].USD },
                                { x: 50, y: myArray[1].USD },
                                { x: 60, y: myArray[1].USD },
                                { x: 70, y: myArray[1].USD },
                                { x: 80, y: myArray[1].USD }
                            ]
                        },
                        {
                            type: "spline", //change it to line, area, column, pie, etc
                            showInLegend: true,
                            name: nameColumn[2],
                            dataPoints: [
                                { x: 10, y: myArray[2].USD },
                                { x: 20, y: myArray[2].USD },
                                { x: 30, y: myArray[2].USD },
                                { x: 40, y: myArray[2].USD },
                                { x: 50, y: myArray[2].USD },
                                { x: 60, y: myArray[2].USD },
                                { x: 70, y: myArray[2].USD },
                                { x: 80, y: myArray[2].USD }
                            ]
                        },
                        {
                            type: "spline", //change it to line, area, column, pie, etc
                            showInLegend: true,
                            name: nameColumn[3],
                            dataPoints: [
                                { x: 10, y: myArray[3].USD },
                                { x: 20, y: myArray[3].USD },
                                { x: 30, y: myArray[3].USD },
                                { x: 40, y: myArray[3].USD },
                                { x: 50, y: myArray[3].USD },
                                { x: 60, y: myArray[3].USD },
                                { x: 70, y: myArray[3].USD },
                                { x: 80, y: myArray[3].USD }
                            ]
                        },
                        {
                            type: "spline", //change it to line, area, column, pie, etc
                            showInLegend: true,
                            name: nameColumn[4],
                            dataPoints: [
                                { x: 10, y: myArray[4].USD },
                                { x: 20, y: myArray[4].USD },
                                { x: 30, y: myArray[4].USD },
                                { x: 40, y: myArray[4].USD },
                                { x: 50, y: myArray[4].USD },
                                { x: 60, y: myArray[4].USD },
                                { x: 70, y: myArray[4].USD },
                                { x: 80, y: myArray[4].USD }
                            ]
                        }
                    ]
                });
                chart.render();




            },
            error: err => alert(err.status)
        });

    } else {
        Swal.fire(
            'Sorry',
            'you must choose a 5 items',
            'error'
        )
    }

}
function handleMoreInfo(event) {
    document.getElementById(event.target.id + event.target.id).innerHTML = `<div class=" loading-price text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
  `
  setTimeout(()=>{

      $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/" + event.target.id,
            success: response => {
                document.getElementById(event.target.id + event.target.id)
                    .innerHTML = `${response.market_data.current_price.usd} $ <br>
                                  ${response.market_data.current_price.eur} € <br>
                                  ${response.market_data.current_price.ils} ₪`
            }
        });
  },1000) 

}
function handleAboutPage() {
    document.getElementById("child").innerHTML = `<h1>Welcome in About Page</h1>`;

}

function myEvent(event) {
    if (event.target.checked === false) {
        localStorage.removeItem(event.target.value);
    } else {
        localStorage.setItem(event.target.value, event.target.value);
    }
}
function clearLocalStorage() {
    localStorage.clear();
    Swal.fire(
        'clear ',
        'your graph is cleared',
        'success'
    )
}

function search(){
    var input = document.getElementById("Search");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('card')
  
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "inline-block";
      } else {
        nodes[i].style.display = "none";
      }
    }
}
