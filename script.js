const cityName = document.querySelector(".cityName");

const notFound = document.querySelector(".notFound");

const weatherInfo = document.querySelector(".weather");

const weatherImg = document.querySelector(".weatherImg");

const tempDegree = document.querySelector(".degree");

const leftMin = document.querySelector(".left");
const rightMin = document.querySelector(".right");
const WindSpeed = document.querySelector("#wind");
const Humidity = document.querySelector("#humadity");
const feelsLike = document.querySelector("#feel");
const pressure = document.querySelector("#pres");
const searchedData = document.querySelector(".formed");

// default city name to check weather
 

// getting full country name using INTL displaynames

const countryCode = (code) => {
  const regionNamesInEnglish = new Intl.DisplayNames([code], { type: 'region' });
  return regionNamesInEnglish.of(code);

}



/// for get search city name 

searchedData.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.querySelector("#search_value");
  console.log(input.value);
  city = input.value;

  // calling the function if the city is in weather api or not
  getWeather();

  input.value = "";

})

// getting date and time

// const datetime = (dt) => {
//   let mydateTime = new Date(dt * 1000);

//   const options = {
//     weekday: "long",
//     day: "numeric",
//     year: "numeric",
//     month: "long",
//     hour: "numeric",
//     minute: "numeric",
//   };
//   return new Intl.DateTimeFormat('en-US', options).format(mydateTime);
// }

let city = "Darbhanga";

// for getting weather information 
const getWeather = async () => {
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=f95b15db02ad8770b61b298ca913c0fa`;

  // creating object constructor
  
  let response = await fetch(weatherApi);

  if(response.status==404){
  notFound.textContent = "City Not Found";
  } else if (response){
    let data = await response.json();
    console.log(data);
  
  
  
    const { main, weather, wind, name, sys, dt } = data;
    cityName.innerHTML = `${data.name} , ${countryCode(sys.country)}`;
    weatherInfo.innerHTML = weather[0].main;
    if (weather[0].main == "Clear") {
      weatherImg.src = "clear.png";
    } else if (weather[0].main == "Clouds") {
      weatherImg.src = "clouds.png";
    } else if (weather[0].main == "Rain") {
      weatherImg.src = "rain.png";
    } else if (weather[0].main == "Dizzle") {
      weatherImg.src = "dizzle.png";
    } else if (weather[0].main == "Mist") {
      weatherImg.src = "mist.png";
    }else if(weather[0].main == "Haze"){
      weatherImg.src = "haze.png";
    } else if(weather[0].Snow){
      weatherImg.src = "snow.png";
    }
    // dateTime.innerHTML = datetime(dt);
    Humidity.innerHTML = `${main.humidity}%`;
    feelsLike.innerHTML = `${main.feels_like}&#x2103`;
    tempDegree.innerHTML = `${Math.round(main.temp)}&#x2103`;
    WindSpeed.innerHTML = `${wind.speed} KMPH`;
    pressure.innerHTML = main.pressure;
  
    return getWeather;
  }
  }
    
   

  


getWeather();