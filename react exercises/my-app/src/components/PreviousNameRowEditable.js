import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

function PreviousNameRowEditable(props){
	const { copy, setCopy, editName, date, onCancelClick, onConfirmClick, onInputChange, setSearchDisabled} = props;
	console.log('copy:', copy)
	return <tr>
		<td>
			<input type='text' value={editName} onChange={onInputChange} />
		</td>
		<td>
			<div>{date}</div>
		</td>
		<td>
			<button onClick={onCancelClick}> Cancel </button>
		</td>
		<td>
			<button onClick={onConfirmClick}> Confirm </button>
		</td>
	</tr>;
}

const withEditName = withState('editName', 'setEditName', (props) => props.name);


export default compose(
	withEditName,
	withHandlers({
		onCancelClick: (props) => () => {
			props.onCancel({ index: props.index });
		},
		onConfirmClick: (props) => () => {
			props.onChange({'name':props.editName, 'date': props.timeStamp}, { index: props.index });
			props.setSearchDisabled('')
		},
		onInputChange: (props) => (event) => {
			props.setEditName(event.currentTarget.value);
			props.copy[props.index].name = event.currentTarget.value
		},
	}),
)(PreviousNameRowEditable);






