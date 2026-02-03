let div = document.createElement('div');
div.innerHTML = "";
let form = document.getElementById("form");
form.after(div);
async function getWeather(city) {
    let api = `https://api.weatherapi.com/v1/current.json?key=0db1076176ff4325bd8164157260202&q=${city}`;
    let a = await fetch(api);
    let b = await a.json();
    return b;
}

async function main(e) {
    e.preventDefault();
    let city = document.getElementById("search").value.trim();
    let container = document.getElementById("container");
    container.innerHTML = "";
    if (city === "") {
        div.innerHTML = "<div class='err'>Please enter a city name</div>";
        return;
    }
    try {
        let weather = await getWeather(city);
        if (weather.error) {
            let notfound = document.createElement("div");
            notfound.setAttribute('class', 'notfound')
            notfound.innerHTML = `<p>${weather.error.message}</p>`;
            container.append(notfound);
        }
        else {
            let result = document.createElement('div');
            result.setAttribute('id', 'result');
            container.appendChild(result);
            result.innerHTML = `<p><b>LOCATION:</b> ${weather.location.name}, ${weather.location.region}, ${weather.location.country}</p>
            <p><b>LOCALTIME:</b> ${weather.location.localtime}</p>
            <div class="content">
                <div class="temp">
                    <img src="${weather.current.condition.icon}" alt="">
                    <div class="temperature">
                        <div class="c">${weather.current.temp_c}<sup>∘</sup>C</div>
                        <div class="f">${weather.current.temp_f}<sup>∘</sup>F</div>
                    </div>
                </div>
                <div class="detail">
                    <div class="top">
                        <p>CURRENT CONDITION:</p>
                        <div>${weather.current.condition.text}</div>
                    </div>
                    <div class="bottom">
                        <div class="line"><img src="wind.svg" width="20" alt="">WIND: ${weather.current.wind_kph} kph</div>
                        <div class="line"><img src="humidity.svg" width="20" alt="">HUMIDITY: ${weather.current.humidity}%</div>
                        <div class="line"><img src="cloud.svg" width="20" alt="">CLOUD: ${weather.current.cloud}%</div>
                        <hr>
                        <div class="time">LAST UPDATED: <span>${weather.current.last_updated}</span></div>
                    </div>
                </div>
            </div>`
        }

    } catch (error) {
        let notfound = document.createElement("div");
        notfound.innerHTML = "<p>Something went wrong. Try again later.</p>";
        container.append(notfound);
        console.log(error);
    }
}

form.addEventListener("submit", main);
