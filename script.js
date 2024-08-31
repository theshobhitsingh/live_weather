document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("location");
  const input = document.querySelector(".search");
  const cityName = document.querySelector(".name");
  const temperature = document.querySelector(".temp");
  const condition = document.querySelector(".condition");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const defaultCity = document.querySelector(".city-time .name");
  const defaultTemp = document.querySelector(".default-temp");
  const defaultTime = document.querySelector(".time");
  const defaultDate = document.querySelector(".date");

  const cities = document.querySelectorAll(".city");
  cities.forEach((city) => {
    city.addEventListener("click", async function () {
      const location = city.textContent.trim();
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=066caad213454ab6b80130212241301&q=${location}`
        );
        const data = response.data;
        updateWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    });
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const location = input.value.trim();
    if (!location) return;

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=066caad213454ab6b80130212241301&q=${location}`
      );
      const data = response.data;
      updateWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });

  function updateWeatherData(data) {
    cityName.textContent = data.location.name;
    temperature.textContent = `${data.current.temp_c}°C`;
    condition.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;
    wind.textContent = `${data.current.wind_kph} km/h`;
    const currentDateTime = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    defaultTime.textContent = currentDateTime.toLocaleTimeString(
      "en-US",
      options
    );
    defaultDate.textContent = currentDateTime.toLocaleDateString(
      "en-US",
      options
    );
    defaultCity.textContent = data.location.name;
    defaultTemp.textContent = `${data.current.temp_c}°C`;
  }
});
