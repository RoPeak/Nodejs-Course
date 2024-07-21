/* Select page elements */
const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const locationPara = document.querySelector("#message-location");
const forecastPara = document.querySelector("#message-forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userLocation = searchElement.value;

  locationPara.innerHTML = "<strong>Loading...</strong>";
  forecastPara.innerHTML = "";

  fetch("http://localhost:3000/weather?address=" + userLocation).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          locationPara.textContent =
            "Sorry, an error has occurred: '" + data.error + "'";
        } else {
          console.log(data);
          locationPara.innerHTML =
            "<strong>Location:</strong><br>" +
            data.location.short +
            " (" +
            data.location.full +
            ")";
          forecastPara.innerHTML =
            "<strong>Forecast:</strong><br>" +
            data.forecast.summary.replace(/\n/g, "<br>");
        }
      });
    }
  );
});
