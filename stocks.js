
document.getElementById("stock-lookup").addEventListener("submit", (event) => {
  event.preventDefault();
  StockInfo();
});

function StockInfo() {

  console.log("function is running")
  var ticker = document.getElementById("ticker").value.toUpperCase();
  var days = document.getElementById("days").value;

  function present(days) {
    var current = new Date();
    current.setDate(current.getDate() - days);
    return current.toISOString().split("T")[0];
  };

  var from = present(days);

  var to = new Date().toISOString().split("T")[0];

  fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&apiKey=304vzB3WzJ4iTWMUjNoIdxuSt0aTmt5r`)
  .then(response => response.json())
  .then(stocks => {

    if (stocks.results) {
      var DateRange = stocks.results.map(dates => new Date(dates.t).toLocaleDateString());
      var Amounts = stocks.results.map(Amount => Amount.c);
      CreateChart(DateRange, Amounts);
    } 
  });

  function CreateChart(DateRange, Amounts) {

    if (Chart.getChart("chart")) Chart.getChart("chart").destroy();
  
    new Chart("chart", {
      type: "line",
      data: {
        labels: DateRange,
        datasets: [{
          label: "Price of Stock in dollars on that Date",
          data: Amounts,
          borderColor: "rgb(0, 0, 0)",
        }]
      },
    });
  }
  
}

async function reddit() {

  var redditAPI = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");

  var StocksList = await redditAPI.json();
  var TopFive = StocksList.slice(0, 5)

  var StockTable = document.querySelector("#stock-table tbody");

  TopFive.forEach(TopStock => {

    var BullBear = document.createElement("img");

    if (TopStock.sentiment === "Bullish") {
      BullBear.src = "https://img.freepik.com/premium-vector/bull-climbs-up-bullish-growth-graph-stock-market_186444-316.jpg"; 
    } else {
      BullBear.src = "https://investmentu.com/wp-content/uploads/2022/03/bearish-stocks.jpg"; 
    }

    var TableRow = document.createElement("tr");
    TableRow.innerHTML = 
    `<td><a href="https://finance.yahoo.com/quote/${TopStock.ticker}" target="_blank"> ${TopStock.ticker} </a></td>
      <td>${TopStock.no_of_comments}</td>
      <td><img src="${BullBear.src}" alt="${TopStock.sentiment}" ></td>`;

    StockTable.appendChild(TableRow);
    
  });

}


window.onload = reddit();


function AudioNavigation() {

  if (annyang) {
    var speech = {

      'Search *ticker': (ticker) => {
        console.log(ticker)
        document.getElementById("ticker").value = ticker.replace(".", "");
        document.getElementById("days").value = "30";
        StockInfo(ticker);
      },

      "navigate to *page": (page) => {
        page = page.toLowerCase();
        window.location.href = `${page}html`; 
      },

      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color.replace(".", "");
      },

      'hello': () => {
        alert('Hello World');
      },
    };

    annyang.addCommands(speech);
  }
}

function listening() {
AudioNavigation();
annyang.start();
}

function notlistening() {
AudioNavigation ();
annyang.abort();
}

