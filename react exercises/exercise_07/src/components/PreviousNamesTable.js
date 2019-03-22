import React from 'react';

function PreviousNamesTable(props){
	return (
		<table>
			<tbody>
				{props.preNames.map((name, index) => {
					return (
						<tr key={`${index}-${name}`}>
							<td>
								<a href="javascript:;" name={name} onClick={props.onNameClick}>{name}</a>
							</td>
							<td>
								<button value={index} name={name} className='hovershow' onClick={props.onNameDelete}> Delete </button>
							</td>
						</tr>
					)
				})
				}
			</tbody>
		</table>
	)}


export default PreviousNamesTable;
