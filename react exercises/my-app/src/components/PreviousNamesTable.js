
import React from 'react';

function PreviousNamesTable(props){
	return (
		<table>
			<tbody>
				{props.preNames.map((name, index) => {
					return (
						<tr key={`${index}-${name}`} className={`${'show'}${index}`}>
							<td className='showATag' >
								<a href="javascript:;" name={name} onClick={props.onNameClick}>{name}</a>
							</td>
							<td>
								<input className='show newName' type='text' defaultValue={name} onChange={props.onInputChange} />
							</td>
							<td>
								<button className='show' value={index} name={name} onClick={props.onNameCancel}> Cancel </button>
							</td>
							<td>
								<button className='show' value={index} name={name} onClick={props.onNameConfirm}> Confirm </button>
							</td>
							<td>
								<button value={index} name={name} className='hovershow' onClick={props.onNameEdit}> Edit </button>
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