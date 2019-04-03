import React from 'react';
import PreviousNameRowEditable from './PreviousNameRowEditable';
import PreviousNameRowReadOnly from './PreviousNameRowReadOnly';
import formatDate from '../helpers/formatDate';
import SortableColumn from './SortableColumn';
import { compose, withState, withHandlers } from 'recompose';

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
	} = props;

	return props.preNames.map((row, index) => {
		if (editingIndex === index) {
			return <PreviousNameRowEditable
				key={`${index}-${row.name}`}
				index={index}
				name={row.name}
				timeStamp={row.date}
				date={formatDate(row.date)}
				onChange={onNameChange}
				onCancel={onEditCancel} />;
		}
		return <PreviousNameRowReadOnly
			key={`${index}-${row.name}`}
			index={index}
			name={row.name}
			date={formatDate(row.date)}
			onEditClick={onEditClick}
			onDeleteClick={onDeleteClick}
			onNameClick={onNameClick} />;
	});
}

export default compose(
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

