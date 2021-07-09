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
];


const agregarEnTemplate = (e) => {
     const ul = document.querySelector("#tabla");
     const template = `<tr><td>${e.symbol} </td><td> ${cortarPrecio(e.markPrice)} </td> <td> ${cortarPrecio(e.indexPrice)}</td><td> ${tasaDeinteres(e)}</td><td> ${cortarDias(toExpiracy(expDay(e.symbol)))}</td><td> ${cortarPrecio(TNA(e))}</td></tr>`
     ul.innerHTML += template;
}   



function expDay(str){

 let str1 = str.slice(str.length-6)
 return str1[2]+str1[3]+"/"+str1[4]+str1[5]+"/"+str1[0]+str1[1]
}

function tasaDeinteres(e){
  let sol = ((e.markPrice/e.indexPrice-1)*100).toString()
  return sol.slice(0, sol.indexOf(".")+3)
}

function cortarPrecio(e){
  e=String(e)
  return e.slice(0, e.indexOf(".")+3)

}

function toExpiracy(e){
  let exp= new Date(e)
  let hoy = new Date()
 
  return (exp-hoy)/(1000 * 60 * 60 * 24)
}

function cortarDias(e){
  let s = String(e)
  return s.slice(0, s.indexOf("."))
}

function TNA(e){
  return (Math.pow(e.markPrice/e.indexPrice, 365/toExpiracy(expDay(e.symbol)))-1)*100
}

window.onload = () => {
 

  
    fetch(epFuturosCoin + "/dapi/v1/premiumIndex")
      .then((result1) => {
        return result1.json()
      })
      .then( res => res.filter(e=>e.nextFundingTime==0).sort((a,b)=>{
        if(a.symbol>b.symbol) return 1
        else return -1
      }).forEach(e=>agregarEnTemplate(e)))

    document.querySelector("#refresh").addEventListener("click", ()=> {
      location.href="./index.html"
    })


}