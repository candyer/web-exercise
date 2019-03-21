import React from 'react';

function PreviousNamesTable(props){
	return (
		<table>
			<tbody>
				{props.preNames.map((name) => {
					return (<tr key={name}>
							<td>
								<a href="javascript:;" name={name} onClick={props.onNameClick}>{name}</a>
							</td>
						</tr>
					)
				})
				}
			</tbody>
		</table>
	)}


export default PreviousNamesTable;
