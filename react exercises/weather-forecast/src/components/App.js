import React from 'react';
import WeeklyInfo from './WeeklyInfo';
import weeklyWeather from '../weekly-weather';
import DailyInfo from './DailyInfo';
import '../App.css';

class App extends React.Component {
	constructor() {
		super();
		this.updateSelectedDay = this.updateSelectedDay.bind(this);
		this.state = {
			daySelected: 'day1',
			weather: weeklyWeather
		}
	};

	updateSelectedDay(day) {
		this.setState({daySelected: day});
	};

	render() {
		// console.log('~~~~~~~~~~', this.state.daySelected)
		return (
			<div>
				<h1>Weather Forecast In a Week</h1>

				<div className="week">
					{
					Object
					.keys(this.state.weather)
					.map(key => 
						<WeeklyInfo 
							key={key}
							id={key}
							details={this.state.weather[key].dailyWeather}
							updateSelectedDay={this.updateSelectedDay}
						/>)
					}
				</div>

				<DailyInfo 
					weather={this.state.weather[this.state.daySelected]}
					/>        
			</div>
		)
	}
}

export default App;