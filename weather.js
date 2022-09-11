class Weather{
    constructor(){
        this.api = "a07c735a65d2465b730b5856ef1e7423"; // generated extra for github
    }

    async fetchWeather(userInput){
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${this.api}`;

            const data = await (await fetch(url)).json();
            const {main:{temp, feels_like, pressure, humidity}, coord:{lon, lat},name, wind:{speed}} = data;
            const {weather} = data
            const {main, icon} = weather[0];

            return {
                temp, feels_like, pressure, humidity,
                lon, lat,
                name, speed,
                main, icon  
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Weather;