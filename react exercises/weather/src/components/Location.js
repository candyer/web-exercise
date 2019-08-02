import React from 'react';

class Location extends React.Component {
	render() {
		return (
			<form onSubmit={this.props.getWeather}>
				<input type="text" name='city' placeholder='Enter City...'/>
				<input type="text" name='country' placeholder='Enter Country...'/> 
				<button>Show Weather</button>
			</form>
		)
	}
}

export default Location;  



// import React from 'react';

// const Location = props => (
// 	<form onSubmit={props.getWeather}>
// 		<input type="text" name='city' placeholder='Enter City...'/>
// 		<input type="text" name='country' placeholder='Enter Country...'/> 
// 		<button>Show Weather</button>
// 	</form>
// )

// export default Location;  