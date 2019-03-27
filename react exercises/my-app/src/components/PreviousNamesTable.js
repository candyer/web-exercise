import React from 'react';
import PreviousNameRowEditable from './PreviousNameRowEditable';
import PreviousNameRowReadOnly from './PreviousNameRowReadOnly';
import formatDate from '../helpers/formatDate';
import { compose, withState, withHandlers } from 'recompose';


function PreviousNamesTable(props){
	const {
		editingIndex,
		onDeleteClick,
		onEditCancel,
		onEditClick,
		onNameChange,
		onNameClick,
		sortNameDirection,
		sortDateDirection,
		onSortNameClick,
		onSortDateClick,
	} = props;
	return (
		<table>
			<tbody>
				<tr>
					<th>
						Name
						<a className={`sort${sortNameDirection}`} href="javascript:;" onClick={onSortNameClick}></a>
					</th>
					<th>
						Date
						<a className={`sort${sortDateDirection}`} href="javascript:;" onClick={onSortDateClick}></a>
					</th>
				</tr>
				{props.preNames.map((row, index) => {
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
				})}
			</tbody>
		</table>
	)}

const withSortNameDirection = withState('sortNameDirection', 'setSortNameDirection', 'NONE');
const withSortDateDirection = withState('sortDateDirection', 'setSortDateDirection', 'NONE');

export default compose(
	withSortNameDirection,
	withSortDateDirection,
	withHandlers({
		onSortNameClick: ({ sortNameDirection, setSortNameDirection}) => () => {
			if (sortNameDirection === 'NONE') {
				setSortNameDirection('ASC')
			} else if (sortNameDirection === 'ASC') {
				setSortNameDirection('DESC')
			} else {
				setSortNameDirection('STOP')
			}
		},

		onSortDateClick: ({ sortDateDirection, setSortDateDirection}) => () => {
			if (sortDateDirection === 'NONE') {
				setSortDateDirection('ASC')
			} else if (sortDateDirection === 'ASC') {
				setSortDateDirection('DESC')
			} else {
				setSortDateDirection('STOP')
			}
		},
	}),
)(PreviousNamesTable);







