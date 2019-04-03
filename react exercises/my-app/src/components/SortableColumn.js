import './SortableColumn.css';
import React from 'react';
import { compose, withHandlers } from 'recompose';

function SortableColumn(props) {
	const { children, direction, onClick } = props;
	const directionClassName = (
		typeof direction === 'string' ?
			' ' + direction.toLowerCase() :
			''
	);

	return <th className="sortable-column" onClick={onClick}>
		{children}
		<i className={`sort-icon${directionClassName}`} />
	</th>
}

export default compose(
	withHandlers({
		onClick: ({ direction, defaultDirection, name, onChange }) => () => {
			if (direction === defaultDirection) {
				// then we can apply the opposite direction
				onChange(name, direction === 'ASC' ? 'DESC' : 'ASC');
			} else if (typeof direction === 'undefined') {
				// another column or no column was sorted, so we want to apply the default direction here
				onChange(name, defaultDirection);
			} else {
				// we already apply the default direction + the opposite one so we disable the sort now
				onChange(name, undefined);
			}
		},
	}),
)(SortableColumn);
