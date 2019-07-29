import React from 'react';
class DailyInfo extends React.Component {
	constructor(){
		super();
		this.renderDetail = this.renderDetail.bind(this);
		
	};

	renderDetail(key) {
		return (
			<div key={key}> {key[0]} -- <b>{key[1]}</b>°C</div>
		)
	}; 
	render() {
		const {weather} = this.props;

		return (
			<div className="hour">
				<h3>{weather.dailyWeather.date} -- hourly weather forecast: </h3>
				<div>
					{Object
						.entries(weather.hourlyWeather)
						.map(this.renderDetail)
					}
				</div>
			</div>
			
		)
	}
}

export default DailyInfo;
