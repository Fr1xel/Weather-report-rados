const baseUrl = "http://api.openweathermap.org/data/2.5/weather?appid=4d6f7c508a8274ee740483e4aab8ca29&units=metric"
const forcastUrl = "http://api.openweathermap.org/data/2.5/forecast?appid=4d6f7c508a8274ee740483e4aab8ca29&units=metric"
const input = document.getElementById("input")
const weatherList = document.querySelector(".weathers")
const forcastCheck = document.getElementById("checkbox")

function enterButton(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        if(forcastCheck.checked){
        getWeather(event, forcastUrl);
      }
        else{
        getWeather(event, baseUrl);
      }
}
}

function newView(data, forcast){	
    if(forcast){
        weatherList.innerHTML = ""
        data.list.forEach(element => {
            const input = `<div class="weather">
            <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
    <h1>${data.city.name}</h1>
    <h2>Temp.: ${Math.round(element.main.temp)}</h2>
    <h2>Date: ${element.dt_txt[0]}</h2>
    <h2>Time: ${element.dt_txt[1]}h</h2>
            </div>`
            weatherList.innerHTML += input
        })
    }
    else{
    const input = `<div class="weather">
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <h1>${data.name}</h1>
    <h2>Temp.: ${Math.round(data.main.temp)}</h2>
    </div>`
    weatherList.innerHTML = input
    }
}

function dateFilter(data){
    data.list.filter(element => {
        element.dt_txt = element.dt_txt.split(" ")
        element.dt_txt[1] = element.dt_txt[1].split(":")
        const filtered = element.dt_txt[1].filter((element, index) => {
            if(index === 0){
                return element
            }
        })
        element.dt_txt[1] = filtered
        element.dt_txt[0] = element.dt_txt[0].split("-")
        const filtered2 = element.dt_txt[0].filter((element, index) => {
            if(index !== 0){
                return element
            }
        }
        )
        element.dt_txt[0] = filtered2.join("-")
    })
}

async function getWeather(event, url){
    const base = await fetch(`${url}&q=${event.target.value}`).catch(error => {console.log(error)})
    const data = await base.json().catch(error => {console.log(error)})
    if(data){
        if(url === baseUrl){
    newView(data, false)
    }
    else{
        dateFilter(data)
        console.log(data)
        newView(data, true)
    }}
}

input.addEventListener("keypress", () => enterButton(event))