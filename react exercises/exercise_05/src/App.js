import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';


class App extends React.Component {
	constructor() {
		super()
		this.state = {
			preName:'',
			name: ''
		};

	}
	onInputChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	onSaveClick(){
		this.setState({
			preName: this.state.name,
			name: ''
		});		
	}

	render(){
		return (
			<div>
				<NameOrPlaceholder name={this.state.name} />
				<input 
					type="text" 
					placeholder="name" 
					value={this.state.name} 
					onChange={e => this.onInputChange(e)}
				/>
				<button onClick={() => this.onSaveClick()}>Save</button>
				<PreviousNameOrEmpty preName={this.state.preName} />
			</div>
		)

	}
}


export default App;
