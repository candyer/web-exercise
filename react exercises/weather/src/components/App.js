import React from 'react';
import Header from './Header';
import Location from './Location';
import CurrWeather from './CurrWeather';
import Hourly from './Hourly';
import getWeather from '../helpers/getWeather';

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

		getWeather(city, country).then((data) => {
			this.setState(Object.assign({}, {
				error: '',
			}, data));
		}).catch((error) => {
			this.setState({
				city: undefined,
				country: undefined,
				currentWeather: {},
				hourlyWeather:[],
				error: error.message,
			});		
		});
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
