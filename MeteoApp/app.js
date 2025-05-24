function getCoordinates() 
  {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherFromCoordinates, showError);
    } else {
      alert("Geolocalizzazione non supportata da questo browser.");
    }
  }
  
  
  function getWeatherFromCoordinates(position)
  {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    fetchWeatherData(latitude, longitude);
  }
  
  function getWeatherFromCity() 
  {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) 
    {
      alert('Per favore, inserisci una città!');
      return;
    }
  
    fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`)
      .then(response => response.json())
      .then(data =>
      {
        if (data.length > 0)
        {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);
          fetchWeatherData(latitude, longitude);
        } else 
      {
          alert('Città non trovata!');
        }
      })
      .catch(error => console.error(error));
  }
  
  function fetchWeatherData(latitude, longitude)
  {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,weather_code`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => 
      {
        const weatherData = data.current;
        displayWeatherInfo(weatherData);
      })
      .catch(error =>
      {
        console.error('Errore nel recupero dei dati meteo:', error);
        alert('Errore nel recupero dei dati meteo!');
      });
  }
  
  function displayWeatherInfo(weatherData) 
  {
    const weatherCard = document.getElementById('weatherCard');
    const weatherInfo = document.getElementById('weatherInfo');
    const weatherIcon = document.getElementById('weatherIcon');
  
    weatherInfo.innerHTML = `
      <strong>Temperatura:</strong> ${weatherData.temperature_2m} °C<br>
      <strong>Umidità:</strong> ${weatherData.relative_humidity_2m} %<br>
      <strong>Precipitazioni:</strong> ${weatherData.precipitation} mm<br>
      <strong>Pioggia:</strong> ${weatherData.rain} mm<br>
      <strong>Copertura Nuvolosa:</strong> ${weatherData.cloud_cover} %<br>
      <strong>Vento:</strong> ${weatherData.wind_speed_10m} km/h
    `;
  
    const weatherCode = weatherData.weather_code;
    weatherIcon.innerHTML = getWeatherIcon(weatherCode);
  }
  
  function getWeatherIcon(weatherCode)
  {
    switch (weatherCode)
    {
      case 0:
        return '<img src="https://openweathermap.org/img/wn/01d.png" alt="Sole">';
      case 1: 
        return '<img src="https://openweathermap.org/img/wn/01d.png" alt="Sole">';
      case 2: 
        return '<img src="https://openweathermap.org/img/wn/02d.png" alt="Parzialmente nuvoloso">';
      case 3: 
        return '<img src="https://openweathermap.org/img/wn/03d.png" alt="Nuvoloso">';
      case 45: 
        return '<img src="https://openweathermap.org/img/wn/50d.png" alt="Nebbia">';
      case 51: 
        return '<img src="https://openweathermap.org/img/wn/09d.png" alt="Pioviggine">';
      case 61: 
        return '<img src="https://openweathermap.org/img/wn/10d.png" alt="Pioggia leggera">';
      case 80: 
        return '<img src="https://openweathermap.org/img/wn/11d.png" alt="Rovesci leggeri">';
      default:
        return '<img src="https://openweathermap.org/img/wn/50d.png" alt="Meteo sconosciuto">';
    }
  }
 
  
  function showError(error) 
  {
    console.error('Errore nella geolocalizzazione:', error);
    alert('Impossibile ottenere la posizione.');
  }
  

  getCoordinates();
