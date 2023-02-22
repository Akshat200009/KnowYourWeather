let weather =
{
    apikey: "c6c79b9240ca11029eddf8cdf3f2e2ae",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${city}
       &units=metric&appid=${this.apikey}`).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description, }=data.weather[0];
        const { speed } = data.wind;
        const { temp, humidity } = data.main;
        console.log(name, icon, description, speed, temp, humidity);
        document.querySelector(".city").innerText="Weather in " + name;
        document.querySelector(".icon").src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector(".description").innerText= description;
        document.querySelector(".temp").innerText= temp + " °C";
        document.querySelector(".humidity").innerText= "Humidity : "+humidity+"%";
        document.querySelector(".wind").innerText= " Wind Speed : "+speed+"kph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?"+name+"')"


    },
    search:function()
    {
      this.fetchWeather(document.querySelector(".search-bar").value)
    }
};


// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  console.log("Browser doesnt support");
}
function showError(error){
  console.log("Error",error);
}
// SET USER'S POSITION
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
  getWeather(latitude, longitude);
}

function getWeather(latitude, longitude){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather.apikey}&units=metric`)
      .then(response => response.json())
      .then(function(data){
          weather.displayWeather(data);
      })
      .catch(err => alert("Something Went Wrong..."));
}

document.querySelector(".search button").addEventListener("click",function()
{
    weather.search()
});
document.querySelector(".search-bar").addEventListener("keyup",function(event)
{
    if(event.key=="Enter")
    weather.search()
});






