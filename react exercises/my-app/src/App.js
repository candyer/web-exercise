import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
// import PreviousNameOrEmpty from './components/PreviousNameOrEmpty';
import PreviousNamesTable from './components/PreviousNamesTable';
import { withState, compose, withHandlers } from 'recompose';


class App extends React.Component {
	render() {
		const props = this.props;
		const {
			editingIndex,
			name,
			onInputChange,
			onNameClick,
			onNameChange,
			onNameDeleteClick,
			onNameEditCancel,
			onNameEditClick,
			onSaveClick,
			preNames,
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
const withPreNames = withState('preNames', 'setPreNames', ['Alice', 'Dave', 'Elsa']);
const withEditingIndex = withState('editingIndex', 'setEditingIndex', -1);

const enhance = compose(
	withName,
	withPreNames,
	withEditingIndex,
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
		onNameClick: ({setName, preNames}) => ({ index }) => {
			setName(preNames[index]);
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

