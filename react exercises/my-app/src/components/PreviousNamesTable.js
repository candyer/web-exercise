import { compose, withHandlers } from 'recompose';
import formatDate from '../helpers/formatDate';
import PreviousNameRowEditable from './PreviousNameRowEditable';
import PreviousNameRowReadOnly from './PreviousNameRowReadOnly';
import React from 'react';
import SortableColumn from './SortableColumn';
import withCurrentPageItems from '../containers/withCurrentPageItems';

function PreviousNamesTable(props){
	return (
		<table>
			<tbody>
				<tr>
					{renderSortableColumn(props, 'name', 'Name', 'ASC')}
					{renderSortableColumn(props, 'date', 'Date', 'DESC')}
				</tr>
				{renderItems(props)}
			</tbody>
		</table>
	);
}

function renderSortableColumn(props, name, label, defaultDirection) {
	const { onSortChange, sort } = props;

	return <SortableColumn
		name={name}
		defaultDirection={defaultDirection}
		direction={name === sort.name ? sort.direction : undefined}
		onChange={onSortChange}>
		{label}
	</SortableColumn>;
}


function renderItems(props) {
	const {
		editingIndex,
		onDeleteClick,
		onEditCancel,
		onEditClick,
		onNameChange,
		onNameClick,
		itemsPerPage,
		currPage,
		copy,
		setCopy,
		setDisable,
	} = props;
	const startIndex = (currPage - 1) * itemsPerPage;
	return props.currentPageItems.map((row, index) => {
		const absoluteIndex = index + startIndex;

		if (editingIndex === absoluteIndex) {
			return <PreviousNameRowEditable
				key={`${index}-${row.name}`}
				copy={copy}
				setCopy={setCopy}
				index={absoluteIndex}
				name={row.name}
				timeStamp={row.date}
				date={formatDate(row.date)}
				onChange={onNameChange}
				onCancel={onEditCancel}
				setDisable={setDisable} />;
		}
		return <PreviousNameRowReadOnly
			key={`${index}-${row.name}`}
			index={absoluteIndex}
			name={row.name}
			date={formatDate(row.date)}
			onEditClick={onEditClick}
			onDeleteClick={onDeleteClick}
			onNameClick={onNameClick} />;
	});
}

export default compose(
	withCurrentPageItems,
	withHandlers({
		onSortChange: ({onSortChange}) => (name, direction) => {
			const sortUpdated = (
				typeof direction === 'undefined' ?
				{ name: 'date', direction: 'DESC' } :
				{ name, direction }
			);

			onSortChange(sortUpdated);
		},
	}),
)(PreviousNamesTable);

