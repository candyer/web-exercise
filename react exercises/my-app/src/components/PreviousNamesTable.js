import React from 'react';
import PreviousNameRowEditable from './PreviousNameRowEditable';
import PreviousNameRowReadOnly from './PreviousNameRowReadOnly';

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
				{props.preNames.map((name, index) => {
					if (editingIndex === index) {
						return <PreviousNameRowEditable
							key={`${index}-${name}`}
							index={index}
							name={name}
							onChange={onNameChange}
							onCancel={onEditCancel} />;
					}
					return <PreviousNameRowReadOnly
						key={`${index}-${name}`}
						index={index}
						name={name}
						onEditClick={onEditClick}
						onDeleteClick={onDeleteClick}
						onNameClick={onNameClick} />;
				})}
			</tbody>
		</table>
	)}


export default PreviousNamesTable;
