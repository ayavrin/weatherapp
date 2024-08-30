document.addEventListener("readystatechange",(event)=>
{
    if(event.target.readyState==="complete"){
        console.log("Loaded..");
        initApp();
    }
})
const initApp=()=>{
    const getform=document.querySelector("form");
    const city=document.querySelector("#city");
    const apiKey="1fa7fc28bc58805abe2590baba1e7a7c";  //private var
    const weatherdata=document.querySelector(".weatherData")
    getform.addEventListener("submit",(event)=>{
        event.preventDefault();
        getlocation();
        
    })
    const getlocation=()=>{
        if(city.value){
            console.log(city.value)
            mainlogic();
        }
        else{
            
        }
    }
    const getLatAndLon=async ()=>{
        const getUrl=urlMaker();
        const response= await fetch(getUrl);
        const jsonresponse=await response.json();
        return jsonresponse;

    }
    const getWeather=async ()=>{
        const primarydata=await getLatAndLon();
        const getUrl2=urlMaker2(primarydata);
        const getWeatherData=await fetch(getUrl2);
        const jsonresponse2= await getWeatherData.json();
        showWeatherData(jsonresponse2);
        
    }
    const showWeatherData=(extractedData)=>{
        console.log(extractedData)
        const {name:location, weather:[{id,main,description,icon}],main:{temp,feels_like,temp_max,temp_min,humidity}}=extractedData;
        weatherdata.innerHTML=`
        <div class="box">
        <img  class="tempimg "src="https://openweathermap.org/img/wn/${icon}@2x.png" >
        <p class="middle">${main}:${description}</p>
        <p class="middle"><img src="gps.png" class="icon1">${location}</p>
        <p class="middle mainTemp">${Math.round(temp-273)}°C</p>
        <div class="middle">
        <span>Feels like:${Math.round(feels_like-273)}°C</span>
        </div>
        <div class="middle">
        <span>Max Temp:${Math.round(temp_max-273)}°C</span>
        <span>Min Temp:${Math.round(temp_min-273)}°C</span>
        </div>
        <p class="middle"><img  class="icon2" src="humidity.png">Humidity:${humidity}</p>
        </div>
        `

        
    }

    const mainlogic=()=>{
        getLatAndLon();
        getWeather();
    }


    //url constructor for lat and long
    const urlMaker=()=>{
        return `https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${apiKey}`;

    }

    //url constructor for weather api
    const urlMaker2=(maindata)=>{
        return `https://api.openweathermap.org/data/2.5/weather?lat=${maindata[0].lat}&lon=${maindata[0].lon}&appid=${apiKey}`
    }

}