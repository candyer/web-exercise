function getWeather(city, country) {
    return new Promise((resolve, reject) => {
        const curr_api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=Metric`);
        const forcast_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=Metric`);
        const currData = await curr_api_call.json();
        const forecastData = await forcast_api_call.json();

        if (currData.cod === 200) {
            resolve({
                city: forecastData.city.name,
                country: forecastData.city.country,
                currentWeather: {
                    temp: currData.main.temp, 
                    icon: `http://openweathermap.org/img/w/${currData.weather[0].icon}.png`,
                    humidity: currData.main.humidity,
                    description: currData.weather[0].description
                },
                hourlyWeather: forecastData.list,
            });

        } else {
            reject(new Error('The location is invalid, please double check!!'));
        }
    });
}

export default getWeather;
