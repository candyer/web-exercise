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
		onSortNameClick: ({preNames, setPreNames, sortNameDirection, setSortNameDirection}) => () => {
			if (sortNameDirection === 'NONE') {
				function compare(a, b){
					if (a.name > b.name) return 1;
					if (b.name > a.name) return -1;
					return 0;
				}
				preNames.sort(compare)
				sortNameDirection = 'ASC'
				setSortNameDirection('ASC')
				
			} else if (sortNameDirection === 'ASC') {
				function compare(a, b){
					if (a.name > b.name) return -1;
					if (b.name > a.name) return 1;
					return 0;
				}	
				preNames.sort(compare)
				sortNameDirection = 'DESC'
				setSortNameDirection('DESC')		
			} else {
				setSortNameDirection('STOP')
			}
		},

		onSortDateClick: ({ preNames, sortDateDirection, setSortDateDirection}) => () => {
			if (sortDateDirection === 'NONE') {
				function compare(a, b){
					if (a.date > b.date) return 1;
					if (b.date > a.date) return -1;
					return 0;
				}
				preNames.sort(compare)
				sortDateDirection = 'ASC'
				setSortDateDirection('ASC')
			} else if (sortDateDirection === 'ASC') {
				function compare(a, b){
					if (a.date > b.date) return -1;
					if (b.date > a.date) return 1;
					return 0;
				}	
				preNames.sort(compare)
				sortDateDirection = 'DESC'
				setSortDateDirection('DESC')
			} else {
				setSortDateDirection('STOP')
			}
		},
	}),
)(PreviousNamesTable);




