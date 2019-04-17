import React from 'react';
import NameOrPlaceholder from './components/NameOrPlaceholder';
import PreviousNamesTable from './components/PreviousNamesTable';
import Pagination from './components/Pagination';
import Search from './components/Search';
import ThemeToggle from './components/ThemeToggle';
import sortByName from './helpers/sortByName';
import sortByDate from './helpers/sortByDate';
import { withState, compose, withHandlers } from 'recompose';


class App extends React.Component {
	render() {
		const props = this.props;
		const {
			name,
			preNames,
			setPreNames,
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
			currPage,
			setCurPage,
			copy,
			setCopy,
			searchDisabled,
			setSearchDisabled,
		} = props;
		const totalItemsCount = preNames.length;
		const itemsPerPage = 6;
		const totalPages = Math.ceil(preNames.length/itemsPerPage);
		const pageNeighbours = 1;

		return (
			<div>
				<ThemeToggle />
				<NameOrPlaceholder name={name} />
				<input
					type="text"
					placeholder="add a name"
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

				<Search 
					preNames={preNames}
					setPreNames={setPreNames}
					copy={copy}
					searchDisabled={searchDisabled}
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
					copy={copy}
					setCopy={setCopy}
					setSearchDisabled={setSearchDisabled}
				/>
			</div>
		)

	}
}
const withCurrPage = withState('currPage', 'setCurPage', '1')
const withName = withState('name', 'setName', '');
const withPreNames = withState('preNames', 'setPreNames', sortByDate([
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
	{	'name': 'Ryan',
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
		'date': 565438765432,
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
	},], 'DESC'));

const withCopy = withState('copy', 'setCopy', sortByDate([
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
	{	'name': 'Ryan',
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
		'date': 565438765432,
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
	},], 'DESC'));

const withSearchDisabled = withState('searchDisabled', 'setSearchDisabled', '')
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
	withSearchDisabled,
	withSort,
	withCopy,
	withHandlers({
		onPageChange: ({setCurPage}) => (pageNum) => {
			setCurPage(pageNum)
		},
		onInputChange: ({setName}) => (e) => setName(e.target.value),
		onSaveClick: ({setPreNames, preNames, name, sort, setCopy}) => () => {
			const sortBy = sort.name === 'name' ? sortByName : sortByDate;
			if (preNames.length < 150){
				preNames.unshift(
					{
						'name': name,
						'date': Date.now(),
					}
				)
				setCopy(preNames)
			} else {
				preNames.unshift(
					{
						'name': name,
						'date': Date.now(),
					}
				);
				preNames.pop();
				setCopy(preNames)
			}
			setPreNames(sortBy(preNames, sort.direction));
		},
		onNameClick: ({setName, preNames}) => ({ index }) => {
			setName(preNames[index].name);
		},
		onNameChange: (props) => (newName, { index }) => {
			const {setCopy, setPreNames, preNames, setEditingIndex, sort} = props;
			const sortBy = sort.name === 'name' ? sortByName : sortByDate;

			preNames[index] = newName;
			setPreNames(sortBy(preNames, sort.direction));
			setCopy(preNames)
			setEditingIndex(-1);
		},
		onNameDeleteClick: ({setPreNames, preNames, copy, setCopy}) => ({ index }) => {
			let deleted_person = preNames[index]
			preNames.splice(index, 1);
			setPreNames(preNames);
			copy = copy.filter(person => {
				return person.name !== deleted_person.name && person.date !== deleted_person.date
			})
			setCopy(copy)
		},
		onNameEditCancel: (props) => () => {
			props.setEditingIndex(-1);
			props.setSearchDisabled('')
		},
		onNameEditClick: (props) => ({ index }) => {
			props.setEditingIndex(index);
			props.setSearchDisabled('disabled')
		},
		onPreNamesSortChange: (props) => ({ name, direction }) => {
			const sortBy = name === 'name' ? sortByName : sortByDate
			props.setSort({ name, direction });
			props.setPreNames(sortBy(props.preNames, direction));
		},
	}))

export default enhance(App);

