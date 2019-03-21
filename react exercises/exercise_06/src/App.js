import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
// import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';
import PreviousNamesTable from './components/PreviousNamesTable';
import { withState, compose, withHandlers } from 'recompose';


class App extends React.Component {
	render(){
		return (
			<div>
				<NameOrPlaceholder name={this.props.name} />
				<input 
					type="text" 
					placeholder="name" 
					value={this.props.name} 
					onChange={this.props.onInputChange}
				/>
				<button onClick={this.props.onSaveClick}>Save</button>

				<PreviousNamesTable onNameClick={this.props.onNameClick} preNames={this.props.preNames} />
			</div>
		)

	}
}

let withName = withState('name', 'setName', '');
let withPreNames = withState('preNames', 'setPreNames', ['Alice', 'Dave']);

const enhance = compose(
	withName,
	withPreNames,
	withHandlers({
		onInputChange: ({setName}) => (e) => setName(e.target.value),
		onSaveClick: ({setPreNames, preNames, name}) => () => {
			if (preNames.length < 10){
				preNames.unshift(name)
				setPreNames(preNames);
			} else {
				preNames.unshift(name)
				preNames.pop()
				setPreNames(preNames);
			}
		},
		onNameClick: ({setName}) => (e) => setName(e.target.name)
	}))

export default enhance(App);












