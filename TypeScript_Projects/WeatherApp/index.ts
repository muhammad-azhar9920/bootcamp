const userInput = document.querySelector("#userInput") as HTMLInputElement;
const btn = document.querySelector("#btn") as HTMLButtonElement;
const showInfo = document.querySelector("#showInfo") as HTMLElement;

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    async function fetchData() {
        try {
            const cityName = userInput.value;
            const apiKey:string = `3de0054bfd7cd865534f1cdf815594ed`;
            const url:string = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
            const req = await fetch(url);
            const res = await req.json();

            if(req.ok){
                return res;
            }else{
                showInfo.textContent = `${userInput.value} is Invalid City!`;
                    console.log("Failed to fetch weather data");
            }

        } catch (error) {
            console.log(error);
        }
    }

    fetchData().then((data)=>{
            let temp = data.main.temp;
            temp = temp - 273.15;
            temp = temp.toFixed(2);
            let country = data.sys.country;
            showInfo.innerHTML = `Temperature : ${temp}C <br>
            City : ${userInput.value}<br>Country : ${country}`;
            userInput.value = "";
            userInput.focus();
    });
});