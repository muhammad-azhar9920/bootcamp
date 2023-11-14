let showData = document.querySelector("#showData");
// let cities = document.querySelector("#cities");
let userInput = document.querySelector("#userInput");
let btn = document.querySelector("#btn");
btn.addEventListener('click', (e) => {
    e.preventDefault();
    // let cityName = cities.options[cities.selectedIndex].value;
    async function fechData() {
        try {
            let cityName = userInput.value;
            let apiKey = `3de0054bfd7cd865534f1cdf815594ed`;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
            let req = await fetch(url);
            let res = await req.json();
            if (req.ok) {
                let temp = res.main.temp - 273.15;
                temp = temp.toFixed(2);
                let country = res.sys.country;
                showData.innerHTML = `Temperature : ${temp}C <br>
                City : ${userInput.value}<br>Country : ${country}`;
            } else {
                showData.textContent = `${userInput.value} is Invalid City!`;
                console.log("Failed to fetch weather data");
            }
        } catch (err) {
            console.log(err);
        }
    }
    fechData();
    // showData.textContent = cities.options[cities.selectedIndex].value;
});