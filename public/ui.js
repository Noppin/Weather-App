import get from "./getEl.js";

class UI{
    constructor(){
        this.bgImg ="/photo?q=";
        this.container = get(".content");
        this.bg = get(".bg");
    }
    async fetchImage(q){
      try{
        const url = `${this.bgImg}${q}&image_type=photo`;
      const res = await (await fetch(url)).json();
      const {hits} = res;
      const {largeImageURL:img} = hits[rand(hits.length)];
      return img;
      function rand (length){
            return Math.floor(Math.random()*length);
      }
      }
      catch(error){
            console.log(error);
      }
      
    }
    showContent({temp, feels_like, pressure, humidity,lon, lat,name, speed, main, icon}, input){
                this.fetchImage(input).then((data)=>{
                  this.bg.style.background = `url(${data}})`;
                });
               
                this.container.innerHTML = `
                
                <div class="container py-5 h-100">
                  <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-8 col-lg-6 col-xl-4">
              
                      <div class="card" style="color: #4B515D; border-radius: 35px;">
                        <div class="card-body p-4">
              
                          <div class="d-flex">
                            <h6 class="flex-grow-1">${name}</h6>
                          </div>
              
                          <div class="d-flex flex-column text-center mt-5 mb-4">
                            <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> ${temp}°C </h6>
                            <span class="small" style="color: #868B94">${main}</span>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="flex-grow-1" style="font-size: 1rem;">
                              <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${speed}km/h
                                </span></div>
                              <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> ${humidity}% </span>
                              </div>
                              <div><span class="ms-1">Feels like: ${feels_like}°C</span>
                              </div>
                              <div><span class="ms-1">longitude: ${lon}</span>
                              </div>
                              <div><span class="ms-1">Latitude: ${lat}</span>
                              </div>
                              <div><span class="ms-1">Pressure: ${pressure} mb</span>
                              </div>
                             
                            </div>
                            <div>
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                              width="100px">
                          </div>
                          </div>
                        </div>
                      </div>
              
                    </div>
                  </div>
              
                </div>
                `;
    }
    showAlert(){
       const input = get("#userInput");
       input.className = "alertOutline";
       setTimeout(()=> input.classList.remove("alertOutline"), 1000);
    }

}

export default UI;