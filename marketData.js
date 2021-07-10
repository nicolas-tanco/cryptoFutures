const endPointPrincipal = "https://api.binance.com";
const urlBook = "/api/v3/ticker/bookTicker?symbol=";
const epFuturosCoin = "https://dapi.binance.com";
const epFuturosUSDT = "https://fapi.binance.com";
const coins = [
  "BTCUSDT",
  "ETHUSDT",
  "ADAUSDT",
  "BNBUSDT",
  "BCHUSDT",
  "DOTUSDT",
  "LINKUSDT",
  "LTCUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "UNIUSDT",
  "SOLUSDT",
  "SHIBUSDT"
];

const datos = []

window.onload = () => {
    coins.forEach(e=>{
        fetch(endPointPrincipal+urlBook+e)
            .then(result => result.json())
            .then(data=>{
                agregarEnTemplate(data)
            })
    })

    document.forms.formRequest.addEventListener("submit", (e) => {
        e.preventDefault();
        let rr = document.forms.formRequest;
        if (
          isUpperCase(rr.request.value) &&
          rr.request.value.length >= 6 &&
          rr.request.value.length <= 8
        ) {
          fetch(
            endPointPrincipal + "/api/v3/ticker/price?symbol=" + rr.request.value
          )
            .then((result) => result.json())
            .then((data) => {
              document.querySelector(
                "#resultadoBusqueda"
              ).innerHTML = `${data.symbol}          ${data.price}`;
            })
            .catch(
              (error) =>
                (document.querySelector(
                  "#resultadoBusqueda"
                ).innerHTML = `${error}`)
            );
        } else {
          document.querySelector(
            "#resultadoBusqueda"
          ).innerHTML = `Introduci un valor correcto`;
        }
      })

      document.querySelector("#refresh").addEventListener("click", ()=>{
        document.querySelector("#tabla").innerHTML=`<div class="columna"><div>Symbol</div><div>Ask Price</div><div>Bid Price</div></div>`
        coins.forEach(e=>{
          fetch(endPointPrincipal+urlBook+e)
              .then(result => result.json())
              .then(data=>{
                  agregarEnTemplate(data)
              })
      })
      })

    
}

const agregarEnTemplate = (e, i) => {
    const ul = document.querySelector("#tabla");
    const template = `<div class="columna"><div>${e.symbol}</div><div>${e.askPrice}</div><div>${e.bidPrice}</div></div >`;
    ul.innerHTML += template;
  };

  function isUpperCase(str) {
    for (i = 0; i < str.length; i++) {
      if (str[i] != str[i].toUpperCase()) return false;
    }
    return true;
  }