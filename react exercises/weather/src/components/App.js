import React from 'react';
import Header from './Header';
import Location from './Location';
import CurrWeather from './CurrWeather';
import Hourly from './Hourly';

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
class App extends React.Component {
	state = {
		city: undefined,
		country: undefined,
		currentWeather: {},
		hourlyWeather: [],
		error: ''
	}

	getWeather = async (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;
		const curr_api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=Metric`);
		const forcast_api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=Metric`);
		const currData = await curr_api_call.json();
		const forecastData = await forcast_api_call.json();
		if (currData.cod === 200) {
			this.setState({
				city: forecastData.city.name,
				country: forecastData.city.country,
				currentWeather: {
					temp: currData.main.temp, 
					icon: "http://openweathermap.org/img/w/" + currData.weather[0].icon + ".png", 
					humidity: currData.main.humidity,
					description: currData.weather[0].description
				},
				hourlyWeather: forecastData.list,
				error: ''		
			})	

		} else {
			this.setState({
			city: undefined,
			country: undefined,
			currentWeather: {},
			hourlyWeather:[],
			error: 'The location is invalid, please double check!!'			
			})			
		}
	} 	

	render(){
		return (
			<div className="App">
				<Header />
				<Location getWeather={this.getWeather}/>
 				<CurrWeather 
 					city={this.state.city}
					country={this.state.country}
					temperature={this.state.currentWeather.temp}
					humidity={this.state.currentWeather.humidity}
					icon={this.state.currentWeather.icon}
					description={this.state.currentWeather.description}
					error={this.state.error}
				/>
				<Hourly weather={this.state.hourlyWeather}/>
			</div>
		);			
	}

}


export default App;
