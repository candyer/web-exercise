import React from 'react';
import PreviousNameRowEditable from './PreviousNameRowEditable';
import PreviousNameRowReadOnly from './PreviousNameRowReadOnly';
import formatDate from '../helpers/formatDate';

function PreviousNamesTable(props){
	const {
		editingIndex,
		onDeleteClick,
		onEditCancel,
		onEditClick,
		onNameChange,
		onNameClick,
	} = props;

	return (
		<table>
			<tbody>
				<tr>
					<th>
						Name
						<a href="javascript:;">❖</a>
					</th>
					<th>
						Date
						<a href="javascript:;">❖</a>
					</th>
				</tr>
				{props.preNames.map((row, index) => {
					if (editingIndex === index) {
						return <PreviousNameRowEditable
							key={`${index}-${row.name}`}
							index={index}
							name={row.name}
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


export default PreviousNamesTable;