import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
import PreviousNamesTable from './components/PreviousNamesTable';
import sortByName from './helpers/sortByName';
import sortByDate from './helpers/sortByDate';
import { withState, compose, withHandlers } from 'recompose';

class App extends React.Component {
	render() {
		const props = this.props;
		const {
			name,
			preNames,
			editingIndex,
			onInputChange,
			onNameClick,
			onNameChange,
			onNameDeleteClick,
			onNameEditCancel,
			onNameEditClick,
			onPreNamesSortChange,
			onSaveClick,
			sort,
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
					onDeleteClick={onNameDeleteClick}
					onEditCancel={onNameEditCancel}
					onEditClick={onNameEditClick}
					onNameChange={onNameChange}
					onNameClick={onNameClick}
					sort={sort}
					onSortChange={onPreNamesSortChange}
					preNames={preNames}
				/>
			</div>
		)

	}
}

const withName = withState('name', 'setName', '');
const withPreNames = withState('preNames', 'setPreNames', [
	{
		'name': 'Dave',
		'date': 1523591603308,
	},
	{
		'name': 'adam',
		'date': 9916033081,
	},
	{
		'name': 'Alice',
		'date': 89160330821,
	},
	{	'name': 'Zoe',
		'date': 278987654,
	},
	{
		'name': 'Elsa',
		'date': 345678987654,
	},]);

const withEditingIndex = withState('editingIndex', 'setEditingIndex', -1);
const withSort = withState('sort', 'setSort', () => ({
	name: 'date',
	direction: 'DESC',
}));

const enhance = compose(
	withName,
	withPreNames,
	withEditingIndex,
	withSort,
	withHandlers({
		onInputChange: ({setName}) => (e) => setName(e.target.value),
		onSaveClick: ({setPreNames, preNames, name, sort}) => () => {
			const sortBy = sort.name === 'name' ? sortByName : sortByDate;

			if (preNames.length < 10){
				preNames.unshift(
					{
						'name': name,
						'date': Date.now(),
					}
				)
			} else {
				preNames.unshift(
					{
						'name': name,
						'date': Date.now(),
					}
				);
				preNames.pop();
			}
			setPreNames(sortBy(preNames, sort.direction));
		},
		onNameClick: ({setName, preNames}) => ({ index }) => {
			setName(preNames[index].name);
		},
		onNameChange: (props) => (newName, { index }) => {
			const {setPreNames, preNames, setEditingIndex, sort} = props;
			const sortBy = sort.name === 'name' ? sortByName : sortByDate;

			preNames[index] = newName;
			setPreNames(sortBy(preNames, sort.direction));
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
		onPreNamesSortChange: (props) => ({ name, direction }) => {
			const sortBy = name === 'name' ? sortByName : sortByDate;

			props.setSort({ name, direction });
			props.setPreNames(sortBy(props.preNames, direction));
		},
	}))

export default enhance(App);
