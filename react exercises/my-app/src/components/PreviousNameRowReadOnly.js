import React from 'react';
import { compose, withHandlers } from 'recompose';
import { ThemeContext } from "../App";

function PreviousNameRowReadOnly(props){
	const { name, date, onEditClick, onDeleteClick, onNameClick } = props;
	return (
		<ThemeContext.Consumer>
		{theme =>
			<tr>
				<td>
					<a href="javascript:;" onClick={onNameClick}>{name}</a>
				</td>
				<td>
					<div >{date}</div>
				</td>
				<td>
					<button className={`hovershow ${theme}`} onClick={onEditClick}> Edit </button>
				</td>
				<td>
					<button className={`hovershow ${theme}`} onClick={onDeleteClick}> Delete </button>
				</td>
			</tr>
		}
		</ThemeContext.Consumer>
	)
	
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