import React from 'react';

class Daily extends React.Component {
	renderError(props) {
		if (typeof props.error === 'string') {
			return <p>{props.error}</p>;
		}
	}
	
	render() {
		const {city, country, temperature, humidity, icon, description} = this.props;
		const hasCity = typeof city === 'string';
		const hasCountry = typeof country === 'string';
		const hasIcon = typeof icon === 'string';
		const hasTemperature = typeof temperature !== 'undefined';
		const hasHumidity = typeof humidity !== 'undefined';
		const hasDescription = typeof description !== 'undefined';
		const hasCityAndCountry = hasCity === true && hasCountry === true;

		return (
			<div className='curr'>
				{hasCityAndCountry === true ? <hr /> : null}
				{hasCityAndCountry === true ? <h2>Current Weather</h2> : null}
				{hasIcon === true ? <img src={icon} alt={description}/> : null}
				{hasCityAndCountry === true ? <p>{city}, {country}</p> : null}
				{hasTemperature === true ? <p>{temperature} °C</p> : null}
				{hasHumidity === true ? <p>{humidity} %</p> : null}
				{hasDescription === true ? <p>{description}</p> : null}
				{this.renderError(this.props)}
				{hasCityAndCountry === true ? <hr /> : null}
			</div>
		)
	}
}

export default Daily;