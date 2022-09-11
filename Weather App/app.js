import get from "./getEl.js";
import UI from "./ui.js";
import Weather from "./weather.js";


// UI
const ui = new UI();

// weather
const weather = new Weather();


const userInput = get("#userInput");
const btn = get(".search");

btn.addEventListener("click", ()=>{
    if(userInput.value !== ""){
        weather.fetchWeather(userInput.value)
        .then(data=> {
                console.log(data);
            if(data)ui.showContent(data, userInput.value);
            else ui.showAlert();
        });
    }
    else{
        ui.showAlert();
    }
    
});




