import React from 'react';

class Daily extends React.Component {
	render() {
		const {city, country, temperature, humidity, icon, description, error} = this.props;
		return (
			<div className='curr'>
				{city && country && <hr />}
				{city && country && <h2>Current Weather</h2>}
				{icon && <img src={icon} alt={description}/>}
				{city && country && <p>{city}, {country}</p>}
				{temperature && <p>{temperature} °C</p>}
				{humidity && <p>{humidity} %</p>}
				{description && <p>{description}</p>}
				{error && <p>{error}</p>}
				{city && country && <hr />}
			</div>
		)
	}
}

export default Daily;