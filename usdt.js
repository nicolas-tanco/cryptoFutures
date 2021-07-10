const endPointPrincipal = "https://api.binance.com";
const urlBook = "/api/v3/ticker/bookTicker?symbol=";
const epFuturosCoin = "https://dapi.binance.com";
const epFuturosUSDT = "https://fapi.binance.com";

window.onload=()=>{
    fetch(epFuturosUSDT+"/fapi/v1/fundingRate?limit=120")
        .then(res => res.json())
        .then(data => {
            data.sort((a,b)=>-(a.fundingRate-b.fundingRate))
            let datos = data.slice(0,5).concat(data.slice(data.length-5))
            datos.forEach(e=>{
                agregarEnTemplate(e)
            })
        })
}




const agregarEnTemplate = (e) => {
    const ul = document.querySelector("#tabla");
    const template = `<div class="columna"><div>${e.symbol}</div><div>${tasaLinda(String(e.fundingRate*100))}</div></div >`;
    ul.innerHTML += template;
  };

function tasaLinda(e){
    return e.slice(0,e.indexOf(".")+4)
}