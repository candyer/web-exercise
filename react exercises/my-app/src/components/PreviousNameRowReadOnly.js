import React from 'react';
import { compose, withHandlers } from 'recompose';

function PreviousNameRowReadOnly(props){
	const { name, onNameClick, onEditClick, onDeleteClick } = props;

	return <tr>
		<td>
			<a href="javascript:;" onClick={onNameClick}>{name}</a>
		</td>
		<td>
			<button className='hovershow' onClick={onEditClick}> Edit </button>
		</td>
		<td>
			<button className='hovershow' onClick={onDeleteClick}> Delete </button>
		</td>
	</tr>;
}

export default compose(
	withHandlers({
		onEditClick: (props) => () => {
			props.onEditClick({ index: props.index });
		},
		onDeleteClick: (props) => () => {
			props.onDeleteClick({ index: props.index });
		},
		onNameClick: (props) => () => {
			props.onNameClick({ index: props.index });
		},
	}),
)(PreviousNameRowReadOnly);
