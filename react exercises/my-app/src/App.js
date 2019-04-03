import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
import PreviousNamesTable from './components/PreviousNamesTable';
import Pagination from './components/Pagination';
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
			onPageChange,
			currPage
		} = props;

		const totalItemsCount = preNames.length;
		const itemsPerPage = 3;
		const totalPages = Math.ceil(preNames.length/itemsPerPage);
		const pageNeighbours = 1;

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
				<Pagination 
					totalItemsCount={totalItemsCount}
					itemsPerPage={itemsPerPage}
					totalPages={totalPages}
					currPage={currPage}
					pageNeighbours={pageNeighbours}
					onPageChange={onPageChange}
				/>

				<PreviousNamesTable
					totalItemsCount={totalItemsCount}
					itemsPerPage={itemsPerPage}
					currPage={currPage}
									
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
const withCurrPage = withState('currPage', 'setCurPage', '1')
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
	{	'name': 'Aria',
		'date': 133278987654,
	},
	{	'name': 'Jon snow',
		'date': 733278987654,
	},
	{	'name': 'Jamie',
		'date': 3456,
	},
	{	'name': 'sam',
		'date': 5765438765432,
	},
	{	'name': 'Jim',
		'date': 765438765432,
	},
	{	'name': 'Pam',
		'date': 87654387654,
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
	withCurrPage,
	withName,
	withPreNames,
	withEditingIndex,
	withSort,
	withHandlers({
		onPageChange: ({currPage, setCurPage}) => (e) => {
			currPage = e.currentTarget.innerHTML
			setCurPage(currPage)
		},
		onInputChange: ({setName}) => (e) => setName(e.target.value),
		onSaveClick: ({setPreNames, preNames, name, sort}) => () => {
			const sortBy = sort.name === 'name' ? sortByName : sortByDate;

			if (preNames.length < 150){
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
