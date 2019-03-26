import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
// import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';
import PreviousNamesTable from './components/PreviousNamesTable';
import { withState, compose, withHandlers } from 'recompose';


class App extends React.Component {
	render() {
		const props = this.props;
		const {
			name,
			date,
			preNames,
			editingIndex,
			onInputChange,
			onNameClick,
			onNameChange,
			onNameDeleteClick,
			onNameEditCancel,
			onNameEditClick,
			onSaveClick,
			
		} = props;

		return (
			<div>
				<NameOrPlaceholder name={name} />
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={onInputChange}
				/>
				<button onClick={onSaveClick}>Save</button>

				<PreviousNamesTable
					editingIndex={editingIndex}
					date={date}
					onNameClick={onNameClick}
					onNameChange={onNameChange}
					onDeleteClick={onNameDeleteClick}
					onEditClick={onNameEditClick}
					onEditCancel={onNameEditCancel}
					preNames={preNames}
				/>
			</div>
		)

	}
}

const withName = withState('name', 'setName', '');
const withDate = withState('date', 'setDate', '');
const withPreNames = withState('preNames', 'setPreNames', [
	{
		'name': 'Dave', 
		'date': '20/01/2014, 12:18:07'
	},	
	{
		'name': 'Alice', 
		'date': '04/01/2013, 23:18:07'
	},
	{
		'name': 'Elsa', 
		'date': '25/03/2019, 12:18:07'
	},]);
const withEditingIndex = withState('editingIndex', 'setEditingIndex', -1);

const enhance = compose(
	withName,
	withDate,
	withPreNames,
	withEditingIndex,
	withHandlers({
		onInputChange: ({setName}) => (e) => setName(e.target.value),
		onSaveClick: ({setPreNames, preNames, name, date, setDate}) => () => {
			date = new Date().toLocaleString()
			setDate(date)
			if (preNames.length < 10){
				preNames.unshift(
					{
						'name': name, 
						'date': date
					}
				)
				setPreNames(preNames);
			} else {
				preNames.unshift(
					{
						'name': name, 
						'date': date
					}
				)
				preNames.pop()
				setPreNames(preNames);
			}
			
		},
		onNameClick: ({setName, preNames}) => ({ index }) => {
			setName(preNames[index].name);
		},
		onNameChange: (props) => (newName, { index }) => {
			const {setPreNames, preNames, setEditingIndex} = props;

			preNames[index] = newName;
			setPreNames(preNames);
			setEditingIndex(-1);
		},
		onNameDeleteClick: ({setPreNames, preNames}) => ({ index }) => {
			preNames.splice(index, 1);
			setPreNames(preNames);
		},
		onNameEditCancel: (props) => () => {
			props.setEditingIndex(-1);
		},
		onNameEditClick: (props) => ({ index }) => {
			props.setEditingIndex(index);
		},
	}))

export default enhance(App);