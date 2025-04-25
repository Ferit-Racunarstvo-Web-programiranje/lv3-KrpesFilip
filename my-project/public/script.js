
document.addEventListener('DOMContentLoaded', () => {
    
    console.log('JavaScript is ready!');


    function prikaziPocetneWeather(weatherData) {
        const tbody = document.querySelector('#weather-tablica tbody');
        if (!tbody) {
          console.error('Table body not found!');
          return;
        }
    
        tbody.innerHTML = ''; // Clear any existing rows
    
        for (const weather of weatherData) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${weather.location}</td>
            <td>${weather.temperature}°C</td>
            <td>${weather.humidity}%</td>
            <td>${weather.windSpeed} km/h</td>
            <td>${weather.percipitation} mm</td>
            <td>${weather.cloudCover}</td>
            <td>${weather.atmosphericPressure} hPa</td>
            <td>${weather.uvIndex}</td>
            <td>${weather.season}</td>
            <td>${weather.visibility} km</td>
          `;
          tbody.appendChild(row);
        }
      }
    
      // Load weather data from the CSV file
      let weatherData = [];
      fetch('weather_Small.csv') // Update the path if necessary
        .then(res => res.text())
        .then(csv => {
          const rezultat = Papa.parse(csv, {
            header: true,
            skipEmptyLines: true
          });
    
          weatherData = rezultat.data.map(weather => ({
            location: weather.location,
            temperature: Number(weather.temperature),
            humidity: Number(weather.humidity),
            windSpeed: Number(weather.windSpeed),
            percipitation: Number(weather.percipitation),
            cloudCover: weather.cloudCover,
            atmosphericPressure: Number(weather.atmosphericPressure),
            uvIndex: Number(weather.uvIndex),
            season: weather.season,
            visibility: Number(weather.visibility)
          }));
    
          prikaziPocetneWeather(weatherData.slice(0, 10)); // Display the first 10 weather entries
        })
        .catch(err => {
          console.error('Error fetching CSV:', err);
        });

  });
  