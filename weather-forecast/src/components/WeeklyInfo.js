import React from 'react';

class WeeklyInfo extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	};

	handleClick(e) {
		this.props.updateSelectedDay(e.currentTarget.dataset.id);
	}

	render() {
		const {id, details} = this.props;
		return (	
			<div className="day" data-id={id} onClick={(e) => this.handleClick(e)}>
				<div> { details.date }</div>
				<div>  { details.weekDay }</div>
				<div className='sign'> { details.sign }  </div>
				<div> { details.weather } </div>
				<div> { details.lowTemp }~{ details.highTemp } °C</div>
			</div>
		)
	};
}

export default WeeklyInfo;