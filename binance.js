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

window.onload = () => {
  fetch(epFuturosCoin + "/dapi/v1/premiumIndex")
    .then((result1) => {
      return result1.json();
    })
    .then((res) =>
      res
        .filter((e) => e.nextFundingTime == 0)
        .sort((a, b) => {
          if (a.symbol > b.symbol) return 1;
          else return -1;
        })
        .forEach((e) => {
          agregarEnTemplate(e);
          subirDatos(e);
        })
    );

  document.querySelector("#refresh").addEventListener("click", () => {
    fetch(epFuturosCoin + "/dapi/v1/premiumIndex")
    .then((result1) => {
      return result1.json();
    }).then((res) =>{
      res.filter((e) => e.nextFundingTime == 0).forEach(e=>{
      let l = datos.findIndex(e1=>e1[0]==e.symbol)
      
      datos[l][1] = cortarPrecio(e.markPrice)
      datos[l][2] = cortarPrecio(e.indexPrice)
     datos[l][3] = tasaDeinteres(e)
     datos[l][4] = cortarDias(toExpiracy(expDay(e.symbol)))
      datos[l][5] = cortarPrecio(TNA(e))
    })
    const tr = document.querySelectorAll("div.columna");
    let trDatos = [];
    for (i = 1; i < tr.length; i++) {
      trDatos.push(tr.item(i));
    }
    trDatos.forEach(
      (e, i) =>
        (e.innerHTML = `<div>${arreglarNombre(datos[i][0])}</div><div>${datos[i][1]}</div><div>${datos[i][2]}</div><div>${datos[i][3]}</div><div>${datos[i][4]}</div><div>${datos[i][5]}</div>`)
    )

  })})



  document.querySelector("#TNA").addEventListener("click", () => {
    datos.sort((a, b) => -(a[5]-b[5]));
    const tr = document.querySelectorAll("div.columna");
    let trDatos = [];
    for (i = 1; i < tr.length; i++) {
      trDatos.push(tr.item(i));
    }
    trDatos.forEach(
      (e, i) =>
        (e.innerHTML = `<div>${arreglarNombre(datos[i][0])}</div><div>${datos[i][1]}</div><div>${datos[i][2]}</div><div>${datos[i][3]}</div><div>${datos[i][4]}</div><div>${datos[i][5]}</div>`)
    );
  });

  document.querySelector("#tasaRealizada").addEventListener("click", () => {
    datos.sort((a, b) => -(a[3]-b[3]));
    const tr = document.querySelectorAll("div.columna");
    let trDatos = [];
    for (i = 1; i < tr.length; i++) {
      trDatos.push(tr.item(i));
    }
    console.log(trDatos);
    trDatos.forEach(
      (e, i) =>
        (e.innerHTML = `<div>${arreglarNombre(datos[i][0])}</div><div>${datos[i][1]}</div><div>${datos[i][2]}</div><div>${datos[i][3]}</div><div>${datos[i][4]}</div><div>${datos[i][5]}</div>`)
    );
  });

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
  });

  document.querySelector("#nameSort").addEventListener("click", ()=>{
    datos.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      else return -1;
    })
    const tr = document.querySelectorAll("div.columna");
    let trDatos = [];
    for (i = 1; i < tr.length; i++) {
      trDatos.push(tr.item(i));
    }
   
    trDatos.forEach(
      (e, i) =>
        (e.innerHTML = `<div>${arreglarNombre(datos[i][0])}</div><div>${datos[i][1]}</div><div>${datos[i][2]}</div><div>${datos[i][3]}</div><div>${datos[i][4]}</div><div>${datos[i][5]}</div>`)
    )

  })
};

const datos = [];

const agregarEnTemplate = (e, i) => {
  const ul = document.querySelector("#tabla");
  const template = `<div class="columna"><div>${
   arreglarNombre(e.symbol)
  }</div><div>${cortarPrecio(e.markPrice)}</div><div>${cortarPrecio(
    e.indexPrice
  )}</div><div>${tasaDeinteres(e)}</div><div>${cortarDias(
    toExpiracy(expDay(e.symbol))
  )}</div><div> ${cortarPrecio(TNA(e))}</div></div >`;
  ul.innerHTML += template;
};

function subirDatos(e) {
  datos.push([
    e.symbol,
    cortarPrecio(e.markPrice),
    cortarPrecio(e.indexPrice),
    tasaDeinteres(e),
    cortarDias(toExpiracy(expDay(e.symbol))),
    cortarPrecio(TNA(e)),
  ]);
}

function expDay(str) {
  let str1 = str.slice(str.length - 6);
  return str1[2] + str1[3] + "/" + str1[4] + str1[5] + "/" + str1[0] + str1[1];
}

function tasaDeinteres(e) {
  let sol = ((e.markPrice / e.indexPrice - 1) * 100).toString();
  return sol.slice(0, sol.indexOf(".") + 3);
}

function cortarPrecio(e) {
  e = String(e);
  return e.slice(0, e.indexOf(".") + 3);
}

function toExpiracy(e) {
  let exp = new Date(e);
  let hoy = new Date();

  return (exp - hoy) / (1000 * 60 * 60 * 24);
}

function cortarDias(e) {
  let s = String(e);
  return s.slice(0, s.indexOf("."));
}

function TNA(e) {
  return (
    (Math.pow(e.markPrice / e.indexPrice, 365 / toExpiracy(expDay(e.symbol))) -
      1) *
    100
  );
}

function isUpperCase(str) {
  for (i = 0; i < str.length; i++) {
    if (str[i] != str[i].toUpperCase()) return false;
  }
  return true;
}

function arreglarNombre(e){
  return e.replace("USD_", "  ")
}
