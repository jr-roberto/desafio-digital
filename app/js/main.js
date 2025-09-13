// const requestOptions = {
//   method: "GET",
//   redirect: "follow"
// };

// fetch("http://api.weatherapi.com/v1/current.json?key=d24ba8718eaf4c24a97175344251309&q=Caucaia&lang=pt", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

document.addEventListener("DOMContentLoaded", ()=>{
    const btnBuscar = document.querySelector("button.search-button");
    btnBuscar.addEventListener("click", ()=>{PesquisarClimaCidade()});
});

function PesquisarClimaCidade() {
    const cidade = document.querySelector("input#search-input").value;

    const API_KEY = "d24ba8718eaf4c24a97175344251309"

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cidade}&lang=pt`, requestOptions)
        .then((response) => response.json())
        .then((result) => RenderizaPagina(result))
        .catch((error) => console.error(error));
}

function RenderizaPagina(data) {
    const pageHtml = document.querySelector("section.infos-container");
    
    const estado = data["location"]["region"];
    const temperatura = Number(data["current"]["temp_c"]);
    const clima = Number(data["current"]["condition"]["text"]);
    const humidity = data["current"]["humidity"];
    const wind_kph = data["current"]["wind_kph"];
    const gust_kph = data["current"]["gust_kph"];

    const html = `
        <h2>${estado}</h2>

        <div class="celsius-area">
            <span class="mdi--cloud-outline"></span>
            <span class="celsius-number"> ${temperatura}° </span>
        </div>

        <p class="time-situation">${clima}</p>

        <section class="card-infos-area">
          <div class="card-info">
            <span class="ion--water-outline"></span>
            <p class="card-title">Umidade</p>
            <p class="card-value">${humidity} %</p>
          </div>

          <div class="card-info">
            <span class="ic--round-air"></span>
            <p class="card-title">Vento</p>
            <p class="card-value">${wind_kph} km/h</p>
          </div>
          <div class="card-info">
            <span class="solar--eye-outline"></span>
            <p class="card-title">Visibilidade</p>
            <p class="card-value">${gust_kph} km</p>
          </div> 

        </section>        
    `

    pageHtml.innerHTML = html;
}
