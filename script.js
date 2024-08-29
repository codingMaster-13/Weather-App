const input = document.querySelector("input");
input.onkeyup = (e) => {
  if (e.key == "Enter" && input.value !== "") {
    Working();
    input.parentElement.style.border = "1px solid white";
  } else if (input.value == "" && e.key == "Enter") {
    input.parentElement.style.border = "1px solid red";
  }
};
const container = document.querySelector(".container .info");
const api = "bd5e378503939ddaee76f12ad7a97608";
const Data = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${api}&lang=en`;
  console.log("Loading...");
  try {
    const data = await fetch(url);
    const response = await data.json();
    return response;
  } catch {
    return "Error, Please Try Again";
  }
};
const Working = () => {
  container.style.height = "300px";
  Data()
    .then((data) => {
      const icon = data.weather[0].icon;
      const temperature = (data.main.temp-273.15).toFixed(2) + '°C';
      const humidity = data.main.humidity;
      container.innerHTML = `
        <div class="icon">
            <img src="${`https://openweathermap.org/img/wn/${icon}@2x.png`}" height="200px" width="200px"/>
        </div>
        <div class="information" style="display: flex; justify-content: space-around; align-items: center; padding: 0 1px; width: 100%;">
            <span>Temperature: ${temperature}</span>
            <span>Humidity: ${humidity}</span>
        </div>
        `;
    })
    .catch((err) => {
      container.innerHTML = "<h1>Error, Please try again</h1>";
    });
};
